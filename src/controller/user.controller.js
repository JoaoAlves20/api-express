import jwt from 'jsonwebtoken';

import UserService from "../service/user.service.js";
import config from '../config/serverConfig.js';
import { sucess, failure } from '../helpers/standardAnswer.js';

class UserController {
    async getAll(_, response) {
        try {
            const result = await UserService.findAll();

            if (!result) {
                failure(response, 'Users not created', 404, 'USERS_NOT_FOUND');
                return;
            }

            sucess(response, result, 200, 'Success to show users');
        } catch (err) {
            console.error('Error:', err.message);
            failure(response, 'Internal server error', 500, 'INTERNAL_ERROR');
        }
    }

    async getById(request, response) {
        try {
            const { id } = request.params;

            const result = await UserService.findById(id);

            if (!result) {
                failure(response, 'User not found', 404, 'USER_NOT_FOUND');
                return;
            }

            sucess(response, result, 200, 'Success to show the user');
        } catch (err) {
            console.error('Error:', err.message);
            failure(response, 'Internal server error', 500, 'INTERNAL_ERROR');
        }
    }

    async registerUser(request, response) {
        try {
            const body = request.body;

            if (!body) {
                failure(response, "Items of body is required", 400, "ITEMS_IS_REQUIRED");
                return;
            }

            const newUser = await UserService.create({ ...body });

            if (!newUser) {
                failure(response, "User not created", 400, "NOT_CREATED");
                return;
            }
            
            sucess(response, newUser, 201, "Created user");
        } catch (err) {
            console.error('Error:', err.message);
            failure(response, 'Internal server error', 500, 'INTERNAL_ERROR');
        }
    }

    async updateUser(request, response) {
        try {
            const body = request.body;
            const { id } = request.params;

            const userExists = await UserService.findById(id);

            if (!userExists) {
                failure(response, 'User not found', 404, 'USER_NOT_FOUND');
                return;
            }

            const userUpdated = await UserService.update(id, { ...body });

            if (!userUpdated) {
                failure(response, "User not updated", 400, "NOT_UPDATED");
                return;
            }
            
            sucess(response, userUpdated, 200, "Updated user");
        } catch (err) {
            console.error('Error:', err.message);
            failure(response, 'Internal server error', 500, 'INTERNAL_ERROR');
        }
    }

    async deleteUser(request, response) {
        try {
            const { id } = request.params;
            const userExists = await UserService.findById(id);

            if (!userExists) {
                failure(response, 'User not found', 404, 'USER_NOT_FOUND');
                return;
            }

            await UserService.delete(id);
            sucess(response, userExists, 200, "Deleted user");
        } catch (err) {
            console.error('Error:', err.message);
            failure(response, 'Internal server error', 500, 'INTERNAL_ERROR');
        }
    }

    async login(request, response) {
        try {
            const { email, password } = request.body;

            const findUser = await UserService.findByEmail(email);

            if (!findUser) {
                failure(response, 'Email not found', 404, 'EMAIL_NOT_FOUND');
                return;
            }

            if (findUser.password !== password) {
                failure(response, 'Password is incorrect', 400, 'PASSWORD_INCORRECT');
                return;
            }

            const token = jwt.sign({ email }, config.secret_key, { expiresIn: '1h' });
            sucess(response, { token }, 200, "Token to login");
        } catch (err) {
            console.error('Error:', err.message);
            failure(response, 'Internal server error', 500, 'INTERNAL_ERROR');
        }
    }
}

export default new UserController();