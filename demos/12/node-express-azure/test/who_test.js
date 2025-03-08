'use strict';
const request = require('supertest');
const server = require('../app');

describe('GET /who', () => {
    test('returns the who page', async () => {
        const response = await request(server).get('/who');
        expect(response.status).toBe(200);
        expect(response.text).toContain('Who We Are');
    });
});
