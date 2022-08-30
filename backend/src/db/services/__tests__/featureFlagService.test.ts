import {describe, expect, test} from '@jest/globals';
import {connect, disconnect} from '../..';
import {getAll, getById} from "../featureFlagService";

describe('Feature Flag Service', () => {
    beforeAll(async () => {
        await connect()
    })
    test('Get all to be defined and to be a function', () => {
        expect(getAll).toBeDefined();
        expect(typeof getAll).toBe('function');
    });

    test('Get by Id to be defined and to be a function', () => {
        expect(getById).toBeDefined();
        expect(typeof getById).toBe('function');
    });

    test('Get All to match user object', async () => {
        const expectedFeatureFlagObject = {
            createdDate: expect.any(Date),
            description: expect.any(String),
            id: expect.any(String),
            name: expect.any(String),
            updatedDate: expect.any(Date)
        };
        const getFeatureFlags = await getAll()
        expect(getFeatureFlags[0]).toMatchObject(expectedFeatureFlagObject);
    });

    afterAll(async () => {
        await disconnect()
    })
});