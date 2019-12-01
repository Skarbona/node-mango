const request = require('supertest');
const User = require('../../../models/users').Model;

const endpoint = '/api/genres/';

describe('auth middleware', () => {
    let server;
    let token;
    let user;

    beforeEach(async () => {
        server = await require('../../../index');
        user = new User();
        token = user.generateAuthToken();
    });

    afterEach(async () => {
        await server.close();
    });

    it.only('should return 401 if no token is provided', async () => {
             const res = await request(server)
            .post(endpoint)
            .set('x-auth-token', '')
            .send({ name: 'genre1' });

        expect(res.status).toBe(401);

    })
});