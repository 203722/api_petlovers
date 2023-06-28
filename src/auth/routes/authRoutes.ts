import { Router } from "express";

import AuthService from "../application/services/AuthService";
import AuthController from "../controllers/AuthController";
import LoginController from "../controllers/LoginController";
import UserController from "../controllers/UserController";
import PostgresDB from "../infrastructure/database/PostgresDB";
import PostgresUserRepository from "../infrastructure/repositories/PostgresUserRepository";

const router = Router();
const db = new PostgresDB();
const userRepository = new PostgresUserRepository(db);
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);
const loginController = new LoginController(authService);
const userController = new UserController(authService);

router.post("/register", authController.handle.bind(authController));
router.post("/login", loginController.handle.bind(loginController));
router.get("/users/:id", userController.handle.bind(userController));

export default router;
