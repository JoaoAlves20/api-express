import UserService from "../service/userService.js";

class UserController {
    async getAll(_, response) {
        try {
            const users = await UserService.findAll();

            if (!users) {
                response.status(200).json({ error: "Users not created" });
            }

            response.status(200).json(users)
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
}

export default new UserController();