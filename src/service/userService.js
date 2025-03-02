import users from "../mocks/users.js";

class UserService {
    findAll() {
        return new Promise((resolve) => resolve(users))
    }

    findById(idUser) {
        return new Promise((resolve) => {
            const user = users.find(user => user.id === +idUser);

            return resolve(user);
        })
    }
}

export default new UserService();