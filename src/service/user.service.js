import users from "../mocks/users.js";

class UserService {
    findAll() {
        return new Promise((resolve) => resolve(users));
    }

    findById(idUser) {
        return new Promise((resolve) => {
            const user = users.find(user => user.id === +idUser);

            return resolve(user);
        })
    }

    create({ username, password, role }) {
        return new Promise((resolve) => {
            const newUser = {
                id: users.length + 1,
                username, password, role
            }
            users.push(newUser);
            return resolve(newUser);
        })
    }

    update(id, user) {
        return new Promise((resolve) => {
            const userUpdate = users.find(user => user.id === +id);
            const newUser = { ...userUpdate, ...user };

            users.map(user => user.id === +id ? newUser : user);
            return resolve(newUser);
        })
    }

    delete(id) {
        return new Promise((resolve) => {
            users.filter(user => user.id !== id);

            return resolve(users);
        })
    }
}

export default new UserService();