/* eslint-disable fp/no-class */
import { Query, Resolver, Ctx, Mutation } from "type-graphql";
import { ResolverContext } from "../../ResolverContextType";

@Resolver()
export class SampleResolver {
    @Query(() => String)
    async hello(@Ctx() context: ResolverContext): Promise<string> {
        const result: { phrase: string }[] = await context.pool.$queryRaw`SELECT 'world' as phrase`;

        return result?.[0].phrase ?? '';
    }

    @Mutation(() => String)
    sampleMutation(): string {
        return 'success';
    }
}