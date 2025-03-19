import { expect } from "chai";

import UserService from "../src/service/user.service.js";
import users from "../src/mocks/users.js";

const USER_CREATE = {
    username: "Admin",
    password: "admin12234",
    role: "moderador"
}

const USER_UPDATE = {
    username: "teste",
    password: "testando",
    role: "Testador"
}

describe("Testing the services", function () {
    it("Testing the findall()", async () => {
        const result = await UserService.findAll();
        expect(result).deep.equal(users);
    })

    it("Testing the findbyid()", async () => {
        const result = await UserService.findById(1);
        expect(result).deep.equal(users[0]);
    })

    it("Testing the create()", async () => {
        const result = await UserService.create(USER_CREATE);
        delete result.id;
        expect(result).deep.equal(USER_CREATE);
    })

    it("Testing the update()", async () => {
        const result = await UserService.update(2, USER_UPDATE);
        delete result.id;
        expect(result).deep.equal(USER_UPDATE);
    })

    it("Testing the delete()", async () => {
        const result = await UserService.delete(3);

        expect(result).deep.equal(users);
    })
})