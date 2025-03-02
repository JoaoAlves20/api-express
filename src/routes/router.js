import { Router } from "express";

import UserController from "../controller/userController.js";

export const router = Router();

router.get("/users", UserController.getAll);
router.get("/user/:id", UserController.getById);