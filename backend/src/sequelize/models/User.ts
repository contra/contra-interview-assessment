import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { configConstants } from '../config/configConstants';
import sequelizeConnection from '../sequelize';

interface UserAttributes {
  id: string;
  name: string;
  email: string;
  createdDate?: Date;
  updatedDate?: Date;
}

export type UserInput = Optional<UserAttributes, 'id' | 'name'>;

// eslint-disable-next-line fp/no-class
class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: string;

  public name!: string;

  public email!: string;

  public readonly createdDate!: Date;

  public readonly updatedDate!: Date;
}

User.init(
  {
    createdDate: {
      allowNull: false,
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    id: {
      allowNull: false,
      defaultValue: Sequelize.fn(configConstants.UUID_GENERATE),
      primaryKey: true,
      type: DataTypes.UUID,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    updatedDate: {
      allowNull: false,
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
    sequelize: sequelizeConnection,
  },
);
export default User;
