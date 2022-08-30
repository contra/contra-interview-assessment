import {describe, expect, test} from '@jest/globals';
import {connect, disconnect} from '../..';
import {getAll, getById} from "../userService";

describe('User Service', () => {
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
        const expectedUserObject = {
            createdDate: expect.any(Date),
            email: expect.any(String),
            id: expect.any(String),
            name: expect.any(String),
            updatedDate: expect.any(Date)
        };
        const users = await getAll()
        expect(users[0]).toMatchObject(expectedUserObject);
    });

    afterAll(async () => {
        await disconnect()
    })
});