'use strict';
const request = require('supertest');
const server = require('../app');

describe('GET /', () => {
    test('returns the homepage', async () => {
        const response = await request(server).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toContain('Welcome to GitHub Copilot Training!');
    });
});
