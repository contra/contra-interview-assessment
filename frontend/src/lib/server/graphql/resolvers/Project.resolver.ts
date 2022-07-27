import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Project, User } from '@/lib/server/entities';
import type { IContext } from '@/lib/server/utils/createContext';

@Resolver()
export class ProjectResolver {
  @Query(() => Project)
  async getProjectById(
    @Arg('projectId') projectId: string,
    @Ctx() { dataSource }: IContext
  ): Promise<Project | null> {
    return await dataSource.getRepository(Project).findOneBy({ projectId });
  }

  @Query(() => [Project])
  async getAllProjects(@Ctx() { dataSource }: IContext): Promise<Project[]> {
    return await dataSource.getRepository(Project).find({
      relations: {
        user: true,
      },
    });
  }

  @Query(() => [Project])
  async getProjectsByUserId(
    @Arg('userId') userId: string,
    @Ctx() { dataSource }: IContext
  ): Promise<Project[]> {
    return await dataSource.getRepository(Project).find({
      where: {
        user: {
          userId,
        },
      },
      relations: {
        user: true,
      },
    });
  }

  @Mutation(() => Project)
  async createProject(
    @Ctx() { dataSource }: IContext,
    @Arg('userId', () => String) userId: string,
    @Arg('title', () => String) title: string,
    @Arg('description', () => String) description: string,
    @Arg('imageUrl', () => String) imageUrl: string
  ): Promise<Project> {
    const user = await dataSource.getRepository(User).findOneBy({ userId });
    if (!user) throw new Error('User not found');

    return await dataSource
      .getRepository(Project)
      .create({ title, description, imageUrl, user })
      .save();
  }

  @Mutation(() => Project, { nullable: true })
  async destroyProject(
    @Ctx() { dataSource }: IContext,
    @Arg('projectId') projectId: string
  ): Promise<Project> {
    const project = await dataSource
      .getRepository(Project)
      .findOneBy({ projectId });
    if (!project) throw new Error('Project not found');

    await dataSource.getRepository(Project).delete({ projectId });

    return project;
  }
}
