import { Router } from "express";

import UserController from "../controller/user.controller.js";
import { verifyLogin } from "../middleware/verifyLogin.js";
import { middleValidateBody } from "../middleware/validateData.js";
import { schemaLogin, schemaRegister, schemaUpdate } from '../schema/index.js'

export const router = Router();

router.get("/", verifyLogin, UserController.getAll);
router.get("/:id", verifyLogin, UserController.getById);
router.post("/", verifyLogin, middleValidateBody(schemaRegister), UserController.register);
router.put("/:id", verifyLogin, middleValidateBody(schemaUpdate), UserController.update);
router.delete("/:id", verifyLogin, UserController.delete);

router.post("/register", middleValidateBody(schemaRegister), UserController.register);
router.post("/login", middleValidateBody(schemaLogin), UserController.login);