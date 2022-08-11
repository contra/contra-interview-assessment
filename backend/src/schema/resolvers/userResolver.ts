/* eslint-disable fp/no-class */
import { Query, Resolver, Root, Arg, Ctx, FieldResolver } from "type-graphql";
import { ResolverContext } from "../../ResolverContextType";
import { User, Flag, SearchUsersInput } from '../types';

@Resolver(() => User)
export class UserResolver {
    @FieldResolver(() => [Flag], { nullable: true })
    async flags(@Root() user: User, @Ctx() context: ResolverContext): Promise<Flag[] | null> {
        const flagIds = Array.from(new Set((await context.pool.userFlag.findMany({
            select: { flagId: true },
            where: {
                userId: user.id
            }
        }))?.map((userFlag) => userFlag.flagId)));

        return context.pool.flag.findMany({
            where: {
                id: { in: flagIds }
            }
        });
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
}