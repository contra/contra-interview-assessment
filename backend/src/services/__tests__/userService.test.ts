import { faker } from '@faker-js/faker';
import { User } from '../../utils/sequelize/models';
import { UserService } from '../userService';

jest.mock('sequelize');
jest.mock('../../utils/sequelize');
jest.mock('../../utils/sequelize/connection');
jest.mock('../../utils/sequelize/config');

jest.mock('../../utils/sequelize/models', () => ({
  FeatureFlag: {
    findByPk: jest.fn(),
  },
  User: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
  },
}));

describe('UserService', () => {
  const userService = new UserService();

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      // @ts-ignore
      const mockUsers: User[] = [
        // @ts-ignore
        {
          createdDate: faker.date.past(),
          email: faker.internet.email(),
          id: faker.datatype.uuid(),
          name: faker.name.fullName(),
          toJSON: jest.fn(),
          updatedDate: faker.date.past(),
        },
        // @ts-ignore
        {
          createdDate: faker.date.past(),
          email: faker.internet.email(),
          id: faker.datatype.uuid(),
          name: faker.name.fullName(),
          toJSON: jest.fn(),
          updatedDate: faker.date.past(),
        },
      ];

      jest.spyOn(User, 'findAll').mockResolvedValue(mockUsers);

      const result = await userService.getUsers();

      expect(User.findAll).toHaveBeenCalledTimes(1);
      expect(result.length).toBe(2);
    });
  });

  describe('getUserById', () => {
    it('should return a user when given a valid id', async () => {
      const userUUID = faker.datatype.uuid();
      // @ts-ignore
      const expectedUser: User = {
        email: faker.internet.email(),
        id: userUUID,
        name: faker.name.fullName(),
        toJSON: jest.fn().mockReturnValue({
          id: userUUID,
        }),
      };

      jest.spyOn(User, 'findByPk').mockResolvedValue(expectedUser);

      const actualUser = await userService.getUserById(expectedUser.id);
      expect(actualUser.id).toEqual(expectedUser.id);
      expect(User.findByPk).toHaveBeenCalledWith(userUUID);
    });
  });

  describe('getUsersWithFeatureFlag', () => {
    it('should return users with feature flags', async () => {
      const mockUsers: User[] = [
        {
          createdDate: faker.date.past(),
          email: faker.internet.email(),
          // @ts-ignore
          FeatureFlags: [
            {
              createdDate: faker.date.past(),
              description: faker.commerce.productDescription(),
              id: faker.datatype.uuid(),
              name: faker.commerce.department(),
              updatedDate: faker.date.past(),
              value: faker.commerce.product(),
            },
            {
              createdDate: faker.date.past(),
              description: faker.commerce.productDescription(),
              id: faker.datatype.uuid(),
              name: faker.commerce.department(),
              updatedDate: faker.date.past(),
              value: faker.commerce.product(),
            },
          ],
          id: faker.datatype.uuid(),
          name: faker.name.fullName(),
          toJSON: jest.fn().mockReturnValue({
            createdDate: faker.date.past(),
            email: faker.internet.email(),
            // @ts-ignore
            FeatureFlags: [
              {
                createdDate: faker.date.past(),
                description: faker.commerce.productDescription(),
                id: faker.datatype.uuid(),
                name: faker.commerce.department(),
                updatedDate: faker.date.past(),
                value: faker.commerce.product(),
              },
              {
                createdDate: faker.date.past(),
                description: faker.commerce.productDescription(),
                id: faker.datatype.uuid(),
                name: faker.commerce.department(),
                updatedDate: faker.date.past(),
                value: faker.commerce.product(),
              },
            ],
            id: faker.datatype.uuid(),
            name: faker.name.fullName(),
            updatedDate: faker.date.past(),
          }),
          updatedDate: faker.date.past(),
        },
      ];

      jest.spyOn(User, 'findAll').mockResolvedValue(mockUsers);

      const result = await userService.getUsersWithFeatureFlag();
      expect(result).toBeDefined();
      expect(result.length).toBe(1);
      expect(result[0].FeatureFlags).toBeDefined();
    });
  });
});
