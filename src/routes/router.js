import { Router } from "express";

import UserController from "../controller/user.controller.js";
import { verifyLogin } from "../middleware/verifyLogin.js";

export const router = Router();

router.get("/", verifyLogin, UserController.getAll);
router.get("/:id", verifyLogin, UserController.getById);
router.post("/", verifyLogin, UserController.createUser);
router.put("/:id", verifyLogin, UserController.updateUser);
router.delete("/:id", verifyLogin, UserController.deleteUser);

router.post("/register", UserController.createUser);
router.post("/login", UserController.login);