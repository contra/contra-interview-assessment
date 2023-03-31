import { faker } from '@faker-js/faker';
import { FeatureFlag, User } from '../../utils/sequelize/models';
import { FeatureFlagService } from '../featureFlagService';

jest.mock('sequelize');
jest.mock('../../utils/sequelize');
jest.mock('../../utils/sequelize/connection');
jest.mock('../../utils/sequelize/config');

jest.mock('../../utils/sequelize/models', () => ({
  FeatureFlag: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
  },
  User: {
    findAll: jest.fn(),
  },
  UserFeatureFlag: {
    bulkCreate: jest.fn(),
    findAll: jest.fn(),
  },
}));

describe('FeatureFlagService', () => {
  const featureFlagService = new FeatureFlagService();

  describe('getFeatureFlags', () => {
    it('should return an array of feature flags', async () => {
      // @ts-ignore
      const mockedFeatureFlags: FeatureFlag[] = [
        // @ts-ignore
        {
          createdDate: faker.date.past(),
          description: faker.commerce.productDescription(),
          id: faker.datatype.uuid(),
          name: faker.commerce.department(),
          toJSON: jest.fn(),
          updatedDate: faker.date.past(),
          value: faker.commerce.product(),
        },
        // @ts-ignore
        {
          createdDate: faker.date.past(),
          description: faker.commerce.productDescription(),
          id: faker.datatype.uuid(),
          name: faker.commerce.department(),
          toJSON: jest.fn(),
          updatedDate: faker.date.past(),
          value: faker.commerce.product(),
        },
      ];

      jest.spyOn(FeatureFlag, 'findAll').mockResolvedValue(mockedFeatureFlags);

      const result = await featureFlagService.getFeatureFlags();

      expect(FeatureFlag.findAll).toHaveBeenCalledTimes(1);
      expect(result.length).toBe(2);
    });
  });

  describe('getFeatureFlagById', () => {
    it('should return a feature flag when given a valid id', async () => {
      const featureFlagUUID = faker.datatype.uuid();
      // @ts-ignore
      const expectedFeatureFlag: FeatureFlag = {
        createdDate: faker.date.past(),
        description: faker.commerce.productDescription(),
        id: featureFlagUUID,
        name: faker.commerce.department(),
        toJSON: jest.fn().mockReturnValue({
          id: featureFlagUUID,
        }),
        updatedDate: faker.date.past(),
        value: faker.commerce.product(),
      };

      jest
        .spyOn(FeatureFlag, 'findByPk')
        .mockResolvedValue(expectedFeatureFlag);

      const featureFlag = await featureFlagService.getFeatureFlagById(
        expectedFeatureFlag.id,
      );
      expect(featureFlag.id).toEqual(expectedFeatureFlag.id);
      expect(FeatureFlag.findByPk).toHaveBeenCalledWith(featureFlagUUID);
    });
  });
  describe('targetUsers', () => {
    it('should create user feature flags and return the feature flag with users', async () => {
      const featureFlagUUID = faker.datatype.uuid();

      const mockFeatureFlag = ({
        createdDate: faker.date.past(),
        description: faker.commerce.productDescription(),
        id: featureFlagUUID,
        name: faker.commerce.department(),
        toJSON: jest.fn().mockReturnValue({
          id: featureFlagUUID,
        }),
        updatedDate: faker.date.past(),
        value: faker.commerce.product(),
      } as unknown) as FeatureFlag;

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
      jest.spyOn(FeatureFlag, 'findByPk').mockResolvedValue(mockFeatureFlag);
      jest.spyOn(User, 'findAll').mockResolvedValue(mockUsers);

      const result = await featureFlagService.targetUsers('1', ['1']);

      expect(result).toBeDefined();
      // @ts-ignore
      expect(result.id).toBe(featureFlagUUID);
      // @ts-ignore
      expect(result.users).toBeDefined();
    });
  });
});
