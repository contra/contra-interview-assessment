import {DataTypes, Model, Optional, Sequelize} from 'sequelize'
import {configConstants} from "../config/configConstants";
import sequelizeConnection from "../sequelize";
import {modelConstants} from "./constants";

interface FeatureFlagAttributes {
    id: string;
    description: string;
    name: string;
    createdDate?: Date;
    updatedDate?: Date;
}

export type FeatureFlagInput = Optional<FeatureFlagAttributes, 'id' | 'name'>

export type FeatureFlagOutput = Required<FeatureFlagAttributes>

// ToDo: remove eslint-disable
// eslint-disable-next-line fp/no-class
class FeatureFlag extends Model<FeatureFlagAttributes, FeatureFlagInput> implements FeatureFlagAttributes {
    public id!: string;

    public name!: string;

    public description!: string;

    public readonly createdDate!: Date;

    public readonly updatedDate!: Date;

}

FeatureFlag.init({
        createdDate: {
            allowNull: false,
            defaultValue: DataTypes.NOW,
            type: DataTypes.DATE,
        },
        description: {
            allowNull: false,
            type: DataTypes.STRING
        },
        id: {
            allowNull: false,
            defaultValue: Sequelize.fn(configConstants.UUID_GENERATE),
            primaryKey: true,
            type: DataTypes.UUID,
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        updatedDate: {
            allowNull: false,
            defaultValue: DataTypes.NOW,
            type: DataTypes.DATE,
        },
    }, {
        freezeTableName: true,
        schema: modelConstants.Schema.COMMON,
        ...modelConstants.ParanoidOptions,
        sequelize: sequelizeConnection
    }
)

export default FeatureFlag