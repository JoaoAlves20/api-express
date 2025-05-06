import { Router } from "express";

import UserController from "../controller/user.controller.js";
import { verifyLogin } from "../middleware/verifyLogin.js";
import {
    middleValidateBody, schemaRegister, schemaLogin, schemaUpdate
} from "../middleware/validateData.js";

export const router = Router();

router.get("/", verifyLogin, UserController.getAll);
router.get("/:id", verifyLogin, UserController.getById);
router.post("/", verifyLogin, middleValidateBody(schemaRegister), UserController.registerUser);
router.put("/:id", verifyLogin, middleValidateBody(schemaUpdate), UserController.updateUser);
router.delete("/:id", verifyLogin, UserController.deleteUser);

router.post("/register", middleValidateBody(schemaRegister), UserController.registerUser);
router.post("/login", middleValidateBody(schemaLogin), UserController.login);