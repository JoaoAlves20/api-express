import UserService from "../service/user.service.js";

class UserController {
    async getAll(_, response) {
        try {
            const users = await UserService.findAll();

            if (!users) {
                response.status(200).json({ error: "Users not created" });
            }

            response.status(200).json(users);
        } catch (err) {
            response.status(500).json({ error: err.message });
        }
    }

    async getById(request, response) {
        try {
            const { id } = request.params;

            if (!id) {
                response.status(400).json({ error: "Id is invalid" });
            }

            const user = await UserService.findById(id);

            if (!user) {
                response.status(404).json({ error: "User not found" });
            }

            response.status(200).json(user);
        } catch (err) {
            response.status(500).json({ error: err.message });
        }
    }

    async createUser(request, response) {
        try {
            const { username, password, role } = request.body;

            if (!username && !password && !role) {
                response.status(400).json({ error: "username, password and role is requireds" });
            }

            const newUser = await UserService.create({ username, password, role });

            if (!newUser) {
                response.status(400).json({ error: "user not created" });
            }
            
            response.status(201).json(newUser);
        } catch (err) {
            response.status(500).json({ error: err.message });
        }
    }

    async updateUser(request, response) {
        try {
            const { username, password, role } = request.body;
            const { id } = request.params;

            const userExists = await UserService.findById(id);

            if (!userExists) {
                response.status(404).json({ error: "User not found" });
            }

            const userUpdate = await UserService.update(id, { username, password, role });

            if (!userUpdate) {
                response.status(400).json({ error: "user not updated" });
            }
            
            response.status(200).json(userUpdate);
        } catch (err) {
            response.status(500).json({ error: err.message });
        }
    }

    async deleteUser(request, response) {
        try {
            const { id } = request.params;
            const userExists = await UserService.findById(id);

            if (!userExists) {
                response.status(404).json({ error: "User not found" });
            }

            await UserService.delete(id);
            response.status(200).json({ message: "User deleted" });
        } catch (err) {
            response.status(500).json({ error: err.message });
        }
    }
}

export default new UserController();