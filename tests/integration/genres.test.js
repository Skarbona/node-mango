const request = require('supertest');
const { Model } = require('../../models/genres');
const User = require('../../models/users').Model;

const endpoint = '/api/genres/';

describe('/api/genres/', () => {
    let server;
    let token;
    let user;

    beforeEach(() => {
        server = require('../../index');
        user = new User();
        token = user.generateAuthToken();
    });

    afterEach(async () => {
        await Model.deleteMany({});
        await server.close();
    });

    describe('GET /', () => {

        it('should return all genres', async () => {
            await Model.collection.insertMany([
                { name: 'genre1' },
                { name: 'genre2' },
            ]);
            const res = await request(server).get(endpoint);

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
            expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
        });
    });

    describe('GET /:id', () => {
        it('should return genre with given ID', async () => {

            const genre = new Model({ name: 'genre1' });
            await genre.save();

            const res = await request(server).get(endpoint + genre._id);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', genre.name)
        });

        it('should return 404 if genre do not exist', async () => {
            await request(server).get(endpoint + '1').catch(err => {
                expect(err.status).toBe(404);
            });
        })
    });


    describe('POST /', () => {
        it('should return 401 if user is not logged in', async () => {
            const res = await request(server).post(endpoint).send({ name: 'genre1' });
            expect(res.status).toBe(401)
        });

        it('should return 400 if genre is less than 5 chars', async () => {

            const res = await request(server)
                .post(endpoint)
                .set('x-auth-token', token)
                .send({ name: '1234' });

            expect(res.status).toBe(400)
        });

        it('should return 400 if genre is more than 50 chars', async () => {

            const res = await request(server)
                .post(endpoint)
                .set('x-auth-token', token)
                .send({ name: new Array(52).join('a') });

            expect(res.status).toBe(400)
        });

        it('should save the genre if it is valid', async () => {

            const res = await request(server)
                .post(endpoint)
                .set('x-auth-token', token)
                .send({ name: 'genre1' });

            const genre = await Model.find({ name: 'genre1' });

            expect(res.status).toBe(200);
            expect(genre).not.toBeNull();
        });

        it('should return genre if it is valid', async () => {

            const res = await request(server)
                .post(endpoint)
                .set('x-auth-token', token)
                .send({ name: 'genre1' });

            await Model.find({ name: 'genre1' });

            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'genre1');
        });

    })
});