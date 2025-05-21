import assert from 'assert';

import UserService from "../src/service/user.service.js";
import { users } from "../src/mocks/users.js";
import { connectDB } from '../src/config/database.js';

const USER_CREATE = {
    username: "Admin",
    email: "admin@gmail.com",
    password: "admin12234",
    role: "moderador"
}

const USER_UPDATE = {
    username: "teste",
    email: "teste@gmail.com",
    password: "testando",
    role: "Testador"
}

describe("Testing the services", function () {
    this.beforeAll(() => connectDB());
    
    it("Testing the findall()", async () => {
        const result = await UserService.findAll();
        assert.deepEqual(result, users);
    })

    it("Testing the findbyid()", async () => {
        const result = await UserService.findById(1);
        assert.deepEqual(result, users[0]);
    })

    it('Testing the findbyemail()', async () => {
        const result = await UserService.findByEmail(USER_UPDATE.email);
        delete result.id;
        assert.deepEqual(result, USER_UPDATE);
    })

    it("Testing the create()", async () => {
        const result = await UserService.create(USER_CREATE);
        delete result.id;
        assert.deepEqual(result, USER_CREATE);
    })

    it("Testing the update()", async () => {
        const result = await UserService.update(2, USER_UPDATE);
        delete result.id;
        assert.deepEqual(result, USER_UPDATE);
    })

    it("Testing the delete()", async () => {
        const result = await UserService.delete(3);
        assert.deepEqual(result, users);
    })
})