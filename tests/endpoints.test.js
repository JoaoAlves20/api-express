import request from 'supertest';
import assert from 'assert';

import server from '../src/server.js';
import { users } from '../src/mocks/users.js';

const USER_GET_BY_ID = users.find(item => item.id === 1);
const USER_CREATE = {
    username: 'admin',
    email: 'admin@gmail.com',
    password: 'admin8080',
    role: 'admin'
}
const USER_UPDATE = {
    username: 'Pedro',
    email: 'pedro@gmail.com',
    password: 'pedro2222',
    role: 'user'
}

describe('Testes da API', function () {
    let token;

    this.beforeAll(async () => {
        const response = await request(server)
            .post('/users/login')
            .send({ email: 'joao@gmail.com', password: 'joao1807' })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        
        token = response.body.data.token;
    })

    it('GET /users', async () => {
        const response = await request(server)
            .get('/users')
            .set('authorization', `Bearer ${token}`);
        
        const { data } = response.body;
        assert.deepEqual(data, users);
    })

    it('GET /users/:id', async () => {
        const response = await request(server)
            .get('/users/1')
            .set('authorization', `Bearer ${token}`)
        
        const { data } = response.body;
        assert.deepEqual(data, USER_GET_BY_ID);
    })

    it('POST /users', async () => {
        const response = await request(server)
            .post('/users')
            .send(USER_CREATE)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('authorization', `Bearer ${token}`)
        
        const { data } = response.body;
        delete data.id;
        assert.deepEqual(data, USER_CREATE);
    })

    it('PUT /users/:id', async () => {
        const response = await request(server)
            .put('/users/2')
            .send(USER_UPDATE)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('authorization', `Bearer ${token}`)
        
        const { data } = response.body;
        delete data.id;
        assert.deepEqual(data, USER_UPDATE);
    })

    it('DELETE /users/:id', async () => {
        const response = await request(server)
            .delete('/users/1')
            .set('authorization', `Bearer ${token}`)
        
        const { data } = response.body;
        assert.deepEqual(data, USER_GET_BY_ID);
    })

    it('POST /users/register', async () => {
        const response = await request(server)
            .post('/users/register')
            .send(USER_CREATE)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        
        const { data } = response.body;
        delete data.id;
        assert.deepEqual(data, USER_CREATE);
    })
})