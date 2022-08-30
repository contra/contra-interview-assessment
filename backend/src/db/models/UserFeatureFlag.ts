import {DataTypes, Model, Optional} from 'sequelize'
import sequelizeConnection from "../sequelize";
import FeatureFlag from './FeatureFlag';
import User from "./User";
import {modelConstants} from "./constants";


interface UserFeatureFlagAttributes {
    userId: string;
    featureFlagId: string;
    createdDate: Date;
    updatedDate: Date;
}

export type UserFeatureFlagInput = Optional<UserFeatureFlagAttributes, 'createdDate' | 'updatedDate'>

export type UserFeatureFlagOutput = Required<UserFeatureFlagAttributes>

// ToDo: remove eslint-disable
// eslint-disable-next-line fp/no-class
class UserFeatureFlag extends Model<UserFeatureFlagAttributes, UserFeatureFlagInput> implements UserFeatureFlagAttributes {
    public userId!: string;

    public featureFlagId!: string;

    public readonly createdDate!: Date;

    public readonly updatedDate!: Date;

}

UserFeatureFlag.init({
        createdDate: {
            allowNull: false,
            defaultValue: DataTypes.NOW,
            type: DataTypes.DATE,
        },
        featureFlagId: {
            allowNull: false,
            field:'featureFlagId',
            references: {
                key: "featureFlagId",
                model: "FeatureFlag"
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
            field:'userId',
            references: {
                key: "userId",
                model: "User"
            },
            type: DataTypes.UUID,
            unique: true,
        },
    }, {
        freezeTableName: true,
        schema: modelConstants.Schema.COMMON,
        ...modelConstants.ParanoidOptions,
        sequelize: sequelizeConnection
    }
)

UserFeatureFlag.belongsTo(User, {
    foreignKey: {
        allowNull: false,
        field: 'userId',
        name: 'userId'
    },
})

UserFeatureFlag.belongsTo(FeatureFlag, {
    foreignKey: {
        allowNull: false,
        field: 'featureFlagId',
        name: 'featureFlagId',
    },
})

UserFeatureFlag.removeAttribute('id');

export default UserFeatureFlag