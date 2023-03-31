import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../connection';
import FeatureFlag from './FeatureFlag';
import User from './User';
import { modelConstants } from './constants';

interface UserFeatureFlagAttributes {
  userId: string;
  featureFlagId: string;
  createdDate: Date;
  updatedDate: Date;
}

export type UserFeatureFlagInput = Optional<
  UserFeatureFlagAttributes,
  'userId' | 'featureFlagId'
>;

// eslint-disable-next-line fp/no-class
class UserFeatureFlag
  extends Model<UserFeatureFlagAttributes, UserFeatureFlagInput>
  implements UserFeatureFlagAttributes {
  public userId!: string;

  public featureFlagId!: string;

  public readonly createdDate!: Date;

  public readonly updatedDate!: Date;
}

UserFeatureFlag.init(
  {
    createdDate: {
      allowNull: false,
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE,
    },
    featureFlagId: {
      allowNull: false,
      references: {
        key: 'featureFlagId',
        model: 'FeatureFlag',
      },
      type: DataTypes.UUID,
    },
    updatedDate: {
      allowNull: false,
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE,
    },
    userId: {
      allowNull: false,
      references: {
        key: 'userId',
        model: 'User',
      },
      type: DataTypes.UUID,
      unique: true,
    },
  },
  {
    freezeTableName: true,
    ...modelConstants.ParanoidOptions,
    sequelize: sequelizeConnection,
  },
);

User.belongsToMany(FeatureFlag, {
  foreignKey: 'userId',
  through: UserFeatureFlag,
});
FeatureFlag.belongsToMany(User, {
  foreignKey: 'featureFlagId',
  through: UserFeatureFlag,
});

User.hasMany(UserFeatureFlag, { foreignKey: 'userId' });
UserFeatureFlag.belongsTo(User, { foreignKey: 'userId' });

FeatureFlag.hasMany(UserFeatureFlag, { foreignKey: 'featureFlagId' });
UserFeatureFlag.belongsTo(FeatureFlag, { foreignKey: 'featureFlagId' });

UserFeatureFlag.removeAttribute('id');

export default UserFeatureFlag;
