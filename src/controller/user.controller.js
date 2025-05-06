import jwt from 'jsonwebtoken';

import UserService from "../service/user.service.js";
import config from '../config/serverConfig.js';

class UserController {
    async getAll(_, response) {
        try {
            const users = await UserService.findAll();

            if (!users) {
                response.status(200).json({ error: "Users not created" });
                return;
            }

            response.status(200).json(users);
        } catch (err) {
            console.error('Error:', err.message);
            response.status(500).json({ error: 'Internal server error' });
        }
    }

    async getById(request, response) {
        try {
            const { id } = request.params;

            if (!id) {
                response.status(400).json({ error: "Id is invalid" });
                return;
            }

            const user = await UserService.findById(id);

            if (!user) {
                response.status(404).json({ error: "User not found" });
                return;
            }

            response.status(200).json(user);
        } catch (err) {
            console.error('Error:', err.message);
            response.status(500).json({ error: 'Internal server error' });
        }
    }

    async createUser(request, response) {
        try {
            const { username, email, password, role } = request.body;

            if (!username && !password && !role) {
                response.status(400).json({ error: "username, password and role is requireds" });
                return;
            }

            const newUser = await UserService.create({ username, email, password, role });

            if (!newUser) {
                response.status(400).json({ error: "user not created" });
                return;
            }
            
            response.status(201).json(newUser);
        } catch (err) {
            console.error('Error:', err.message);
            response.status(500).json({ error: 'Internal server error' });
        }
    }

    async updateUser(request, response) {
        try {
            const { username, password, role } = request.body;
            const { id } = request.params;

            const userExists = await UserService.findById(id);

            if (!userExists) {
                response.status(404).json({ error: "User not found" });
                return;
            }

            const userUpdate = await UserService.update(id, { username, password, role });

            if (!userUpdate) {
                response.status(400).json({ error: "user not updated" });
                return;
            }
            
            response.status(200).json(userUpdate);
        } catch (err) {
            console.error('Error:', err.message);
            response.status(500).json({ error: 'Internal server error' });
        }
    }

    async deleteUser(request, response) {
        try {
            const { id } = request.params;
            const userExists = await UserService.findById(id);

            if (!userExists) {
                response.status(404).json({ error: "User not found" });
                return;
            }

            await UserService.delete(id);
            response.status(200).json({ message: "User deleted" });
        } catch (err) {
            console.error('Error:', err.message);
            response.status(500).json({ error: 'Internal server error' });
        }
    }

    async login(request, response) {
        try {
            const { email, password } = request.body;

            const emailExists = await UserService.findByEmail(email);

            if (!emailExists) {
                response.status(404).json({ error: 'Email not found' });
                return;
            }

            if (emailExists.password !== password) {
                response.status(400).json({ error: 'Password is incorrect' });
                return;
            }

            const token = jwt.sign({ email }, config.secret_key, { expiresIn: '1h' });
            response.status(200).json({ token });
        } catch (err) {
            console.error('Error:', err.message);

            response.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default new UserController();