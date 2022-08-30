import {describe, expect, test} from '@jest/globals';
import {connect, disconnect} from '../..';
import {getAll} from "../userFeatureFlagService";

describe('User feature Flag Service', () => {
    beforeAll(async () => {
        await connect()
    })
    test('Get all to be defined and to be a function', () => {
        expect(getAll).toBeDefined();
        expect(typeof getAll).toBe('function');
    });

    test('Get All to match user object', async () => {
        const expectedUserFeatureFlagObject = {
            createdDate: expect.any(Date),
            featureFlagId: expect.any(String),
            updatedDate: expect.any(Date),
            userId: expect.any(String)
        };
        const getFeatureFlags = await getAll()
        expect(getFeatureFlags[0]).toMatchObject(expectedUserFeatureFlagObject);
    });

    afterAll(async () => {
        await disconnect()
    })
});