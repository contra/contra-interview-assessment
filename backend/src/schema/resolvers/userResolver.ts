/* eslint-disable fp/no-class */
import { Query, Resolver, Root, Arg, Ctx, FieldResolver, Mutation } from "type-graphql";
import { ResolverContext } from "../../ResolverContextType";
import { User, Flag, SearchUsersInput, UpdateUserFlagInput, AddUsersFlagInput } from '../types';

@Resolver(() => User)
export class UserResolver {
    @FieldResolver(() => [Flag], { nullable: true })
    async flags(@Root() user: User, @Ctx() context: ResolverContext): Promise<Flag[] | null> {
        const flagIds = await context.pool.userFlag.findMany({
            select: { flagId: true, isOn: true, variantId: true },
            where: {
                userId: user.id
            }
        });

        const flags = await context.pool.flag.findMany({
            include: {
                flagVariants: true
            },
            where: {
                id: { in: flagIds.map((flag) => flag.flagId) }
            }
        });

        const variants: Record<number, string> = (await context.pool.flagVariant.findMany({
            select: {
                flagId: true,
                variantName: true
            },
            where: {
                id: { in: flagIds.filter((flag) => Boolean(flag.variantId)).map((flag) => flag.variantId) as number[] }
            }
        })).reduce((previous, current) => ({ ...previous, [current.flagId]: current.variantName }), {});

        const userFlagValues: Record<number, boolean | null> = flagIds.reduce((previous, current) => ({ ...previous, [current.flagId]: current.isOn }), {});

        return flags.map((flag) => ({ ...flag, isOn: userFlagValues[flag.id] ?? flag.isOn, variant: variants[flag.id] }));
    }

    @Query(() => [User])
    async users(@Arg("data", { nullable: true }) searchData: SearchUsersInput, @Ctx() context: ResolverContext): Promise<User[]> {
        const {
            limit,
            offset = 0,
            sort,
            ids,
            givenNames,
            familyNames,
            emailAddresses,
        } = searchData ?? {};
        const where = {
            ...(ids
                ? {
                    id: {
                        in: ids,
                    },
                }
                : {}),
            ...(givenNames
                ? {
                    givenName: {
                        in: givenNames,
                    },
                }
                : {}),
            ...(familyNames
                ? {
                    familyName: {
                        in: familyNames,
                    },
                }
                : {}),
            ...(emailAddresses
                ? {
                    emailAddress: {
                        in: emailAddresses,
                    },
                }
                : {}),
        };
        let orderBy;
        if (sort?.field && sort?.order) {
            orderBy = { [sort.field]: sort.order };
        }

        return context.pool.user.findMany({
            where,
            ...(limit ? { take: limit } : {}),
            orderBy: orderBy ?? { id: "asc" },
            skip: offset,
        });
    }

    @Mutation(() => User)
    async updateUserFlag(@Arg("data") updateData: UpdateUserFlagInput, @Ctx() context: ResolverContext): Promise<User> {
        const { userId, flagId, variantId, isOn } = updateData;
        const userFlag = await context.pool.userFlag.findFirstOrThrow({
            where: {
                flagId,
                userId
            }
        });
        const flagVariants = await context.pool.flagVariant.findMany({
            where: {
                flagId
            }
        });
        if (flagVariants?.length && !(variantId || userFlag.variantId)) throw new Error(`You must supply a variant for flag id ${flagId}`);
        await context.pool.userFlag.update({
            data: {
                isOn,
                variantId
            },
            where: {
                id: userFlag.id
            }
        });

        const user = await context.pool.user.findFirst({
            where: {
                id: userId
            }
        });
        if (!user) throw new Error(`Error reading data for user ${userId}`);

        return user;
    }

    @Mutation(() => [User])
    async updateUsersFlag(@Arg("data") updateData: AddUsersFlagInput, @Ctx() context: ResolverContext): Promise<User[]> {
        const { userIds, flagId, variantId, isOn } = updateData;
        await context.pool.flag.findUniqueOrThrow({
            where: {
                id: flagId
            }
        });
        const flagVariants = await context.pool.flagVariant.findMany({
            where: {
                flagId
            }
        });
        if (flagVariants?.length && !variantId) throw new Error(`You must supply a variant for flag id ${flagId}`);

        await context.pool.$transaction(
            userIds.map((userId) => {
                return context.pool.userFlag.upsert({
                    create: {
                        flagId,
                        isOn,
                        userId,
                        variantId
                    },
                    update: {
                        isOn,
                        variantId
                    },
                    where: {
                        uqUserFlag: {
                            flagId,
                            userId
                        }
                    }
                });
            })
        );

        // eslint-disable-next-line fp/no-this
        return this.users({ ids: userIds }, context);
    }
}