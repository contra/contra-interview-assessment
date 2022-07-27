import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '@/lib/server/entities';
import type { IContext } from '@/lib/server/utils/createContext';

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async getAllUsers(@Ctx() { dataSource }: IContext): Promise<User[]> {
    return await dataSource.getRepository(User).find();
  }

  @Query(() => User)
  async getUser(
    @Arg('userId') userId: string,
    @Ctx() { dataSource }: IContext
  ): Promise<User | null> {
    return await dataSource.getRepository(User).findOneBy({ userId });
  }

  @Mutation(() => User)
  async registerUser(
    @Ctx() { dataSource }: IContext,
    @Arg('firstName', () => String) firstName: string,
    @Arg('lastName', () => String) lastName: string,
    @Arg('email', () => String) email: string,
    @Arg('password', () => String) password: string,
    @Arg('profileTitle', () => String, { nullable: true })
    profileTitle?: string,
    @Arg('imageUrl', () => String, { nullable: true }) imageUrl?: string,
    @Arg('tags', () => [String], { nullable: true }) tags?: string[],
    @Arg('bio', () => String, { nullable: true }) bio?: string,
    @Arg('verifiedAccount', () => Boolean, { nullable: true })
    verifiedAccount?: boolean,
    @Arg('location', () => String, { nullable: true }) location?: string
  ): Promise<User> {
    return await dataSource
      .getRepository(User)
      .create({
        firstName,
        lastName,
        email,
        password,
        profileTitle,
        imageUrl,
        tags,
        bio,
        verifiedAccount,
        location,
      })
      .save();
  }

  @Mutation(() => User, { nullable: true })
  async destroyUser(
    @Arg('userId') userId: string,
    @Ctx() { dataSource }: IContext
  ): Promise<User> {
    const user = await dataSource.getRepository(User).findOneBy({ userId });
    if (!user) throw new Error('User not found');

    await dataSource.getRepository(User).delete({ userId });

    return user;
  }
}
