import { User, UserFeatureFlag, FeatureFlag } from '../utils/sequelize/models';

interface UserWithFeatureFlag extends User {
  FeatureFlags: FeatureFlag[];
}

// eslint-disable-next-line fp/no-class
export class UserService {
  async getUsers(): Promise<User[]> {
    const users = await User.findAll();

    return users.map((user) => user.toJSON() as User);
  }

  async getUserById(id: string): Promise<User> {
    const user = await User.findByPk(id);
    if (!user) {
      return {} as User;
    }

    return user.toJSON() as User;
  }

  async getUsersWithFeatureFlag(): Promise<UserWithFeatureFlag[]> {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email'],
      include: [
        {
          all: true,
          model: UserFeatureFlag,
          required: true,
        },
      ],
    });
    const usersWithFeatureFlag = users.map(
      (user) => user.toJSON() as UserWithFeatureFlag,
    );

    const result = usersWithFeatureFlag.map((user) => {
      return {
        ...user,
        featureFlags: user.FeatureFlags.map((flag) => {
          return {
            ...flag,
          } as FeatureFlag;
        }),
      };
    });

    return (result as unknown) as UserWithFeatureFlag[];
  }
}
