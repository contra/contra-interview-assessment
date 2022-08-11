/* eslint-disable fp/no-class */
import { Query, Resolver, Root, Arg, Ctx, FieldResolver, Mutation } from "type-graphql";
import { ResolverContext } from "../../ResolverContextType";
import { User, Flag, SearchUsersInput, UpdateUserFlagInput, AddUsersFlagInput } from '../types';

type FlagsQueryResult = {
    id: number;
    flag_name: string;
    env: string;
    description: string | null;
    created_at: string | null;
    updated_at: string | null;
    is_on: boolean;
    variant_name: string | null;
};

@Resolver(() => User)
export class UserResolver {
    @FieldResolver(() => [Flag], { nullable: true })
    async flags(@Root() user: User, @Ctx() context: ResolverContext): Promise<Flag[] | null> {
        const result: FlagsQueryResult[] = await context.pool.$queryRaw`
            SELECT  f.id, f.flag_name, f.env, f.description, f.created_at, f.updated_at,
                    COALESCE(uf.is_on, f.is_on) is_on, fv.variant_name
            FROM    user_account u
            JOIN    user_flag uf ON uf.user_id = u.id
            JOIN    flag f ON f.id = uf.flag_id
            LEFT JOIN flag_variant fv ON fv.id = uf.variant_id
            WHERE   u.id = ${user.id}`;

        return result?.map((row: FlagsQueryResult) => ({
            createdAt: row.created_at ? new Date(row.created_at) : null,
            description: row.description,
            env: row.env,
            flagName: row.flag_name,
            id: row.id,
            isOn: row.is_on,
            updatedAt: row.updated_at ? new Date(row.updated_at) : null,
            variant: row.variant_name
        }));
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