import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { Project } from '@/lib/server/entities';
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
}
