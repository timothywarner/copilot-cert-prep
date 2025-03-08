const request = require('supertest');
const server = require('../app');

describe('GET /contact', () => {
    test('returns the contact page', async () => {
        const response = await request(server).get('/contact');
        expect(response.status).toBe(200);
        expect(response.text).toContain('Contact Us');
    });
});