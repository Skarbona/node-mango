const request = require('supertest');
const User = require('../../../models/users').Model;
const Genre = require('../../../models/genres').Model;

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
        await Genre.deleteMany({});
        await server.close();
    });

    it.only('should return 401 if no token is provided', async () => {
        const res = await request(server)
            .post(endpoint)
            .set('x-auth-token', '')
            .send({ name: 'genre1' });

        expect(res.status).toBe(401);
    });

    it.only('should return 400 if token is invalid', async () => {
        const res = await request(server)
            .post(endpoint)
            .set('x-auth-token', 'a')
            .send({ name: 'genre1' });

        expect(res.status).toBe(400);
    });

    it.only('should return 200 if token is valid', async () => {
        const res = await request(server)
            .post(endpoint)
            .set('x-auth-token', token)
            .send({ name: 'genre1' });

        expect(res.status).toBe(200);
    });
});