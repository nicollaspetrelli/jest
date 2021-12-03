const request = require('supertest');
const app = require('../src/server');

const USERNAME_ID_1 = 'user001';
const USERNAME_ID_2 = 'user002';

/**
 * @link https://jestjs.io/docs/api
 */

describe('Servidor está funcionando', () => {
    it('Responde a GET /', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('status', true);
    });
});

describe('Inicializa vazio', () => {
    it('Responde a GET /user', async () => {
        const res = await request(app).get('/user');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('status', true);
        expect(res.body.data).toHaveLength(0);
    });
});

describe('Cadastra usuários', () => {
    it('Responde 401 a POST /user sem username', async () => {
        const res = await request(app).post('/user');
        expect(res.statusCode).toEqual(401);
    });

    it('Responde 201 a POST /user com JSON', async () => {
        const res = await request(app).post('/user').send({
            username: USERNAME_ID_1
        });
        expect(res.statusCode).toEqual(201);
    });

    it('Responde 201 a POST /user com x-www-form-urlencoded', async () => {
        const res = await request(app).post('/user').send('username=' + USERNAME_ID_2);
        expect(res.statusCode).toEqual(201);
    });

    it('Responde 409 a POST /user com mesmo username', async () => {
        const res = await request(app).post('/user').send({
            username: USERNAME_ID_1
        });
        expect(res.statusCode).toEqual(409);
    });
});

describe('Retorna usuários após cadastro', () => {
    it('Responde 200 a GET /user', async () => {
        const res = await request(app).get('/user');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('status', true);
        expect(res.body.data).toHaveLength(2);
    });

    it('Responde 200 a GET /user/1', async () => {
        const res = await request(app).get('/user/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('status', true);
        expect(res.body).toHaveProperty('data.id', 1);
        expect(res.body).toHaveProperty('data.username', USERNAME_ID_1);
    });

    it('Responde 200 a GET /user/2', async () => {
        const res = await request(app).get('/user/2');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('status', true);
        expect(res.body).toHaveProperty('data.id', 2);
        expect(res.body).toHaveProperty('data.username', USERNAME_ID_2);
    });

    it('Responde 404 a GET /user/3', async () => {
        const res = await request(app).get('/user/3');
        expect(res.statusCode).toEqual(404);
    });
});

describe('Apaga usuários', () => {
    it('Responde 200 a DELETE /user/2', async () => {
        const res = await request(app).delete('/user/2');
        expect(res.statusCode).toEqual(200);
    });

    it('Responde 404 a GET /user/2', async () => {
        const res = await request(app).get('/user/2');
        expect(res.statusCode).toEqual(404);
    });

    it('Recadastra novo usuário com ID 3', async () => {
        const res = await request(app).post('/user').send({
            username: 'user003'
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('data.id', 3);
    });
});
