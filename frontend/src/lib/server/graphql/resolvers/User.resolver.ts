import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '@/lib/server/entities';
import { AppDataSource } from '@/lib/server/utils/database';

@Resolver()
export class UserResolver {
  private userRepository = AppDataSource.getRepository(User);

  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  @Query(() => User)
  async getUser(@Arg('userId') userId: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ userId });
  }

  @Mutation(() => User)
  async registerUser(
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
    return await this.userRepository
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
  async destroyUser(@Arg('userId') userId: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ userId });
    if (!user) throw new Error('User not found');

    await this.userRepository.delete({ userId });

    return user;
  }
}
