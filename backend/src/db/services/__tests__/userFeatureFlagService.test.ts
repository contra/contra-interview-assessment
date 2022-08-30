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


    afterAll(async () => {
        await disconnect()
    })
});