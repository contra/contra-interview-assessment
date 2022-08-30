import {describe, expect, test} from '@jest/globals';
import FeatureFlag from "../FeatureFlag";
import User from "../User";
import UserFeatureFlag from "../UserFeatureFlag";


describe('Modules', () => {
    test('User model should be configured', () => {
        const userTable = User
        expect(userTable.options.freezeTableName).toBe(true);
    });

    test('FeatureFlag model should be configured', () => {
        const featureFlagTable = FeatureFlag
        expect(featureFlagTable.options.freezeTableName).toBe(true);
    });

    test('UserFeatureFlag model should be configured', () => {
        const userFeatureFlagTable = UserFeatureFlag
        expect(userFeatureFlagTable.options.freezeTableName).toBe(true);
    });

});