import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Project, User } from '@/lib/server/entities';
import { AppDataSource } from '@/lib/server/utils/database';

@Resolver()
export class ProjectResolver {
  private projectRepository = AppDataSource.getRepository(Project);

  @Query(() => Project)
  async getProjectById(
    @Arg('projectId') projectId: string
  ): Promise<Project | null> {
    return await this.projectRepository.findOneBy({ projectId });
  }

  @Query(() => [Project])
  async getAllProjects(): Promise<Project[]> {
    return await this.projectRepository.find({
      relations: {
        user: true,
      },
    });
  }

  @Query(() => [Project])
  async getProjectsByUserId(@Arg('userId') userId: string): Promise<Project[]> {
    return await this.projectRepository.find({
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
    @Arg('userId', () => String) userId: string,
    @Arg('title', () => String) title: string,
    @Arg('description', () => String) description: string,
    @Arg('imageUrl', () => String) imageUrl: string
  ): Promise<Project> {
    const user = await AppDataSource.getRepository(User).findOneBy({ userId });
    if (!user) throw new Error('User not found');

    return await this.projectRepository
      .create({ title, description, imageUrl, user })
      .save();
  }

  @Mutation(() => Project, { nullable: true })
  async destroyProject(@Arg('projectId') projectId: string): Promise<Project> {
    const project = await this.projectRepository.findOneBy({ projectId });
    if (!project) throw new Error('Project not found');

    await this.projectRepository.delete({ projectId });

    return project;
  }
}
