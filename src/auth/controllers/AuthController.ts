import { Request, Response } from "express";

import RegisterUserDTO from "../application/data/RegisterUserDTO";
import AuthService from "../application/services/AuthService";
import IController from "../interfaces/IController";

class AuthController implements IController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { username, mail, password } = request.body as RegisterUserDTO;
      const user = await this.authService.registerUser({
        username,
        mail,
        password,
      });
      return response.status(201).json(user);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ error: error.message });
      } else {
        return response.status(400).json({ error: "An error occurred" });
      }
    }
  }
}

export default AuthController;
