import { Request, Response } from "express";

import LoginDTO from "../application/data/LoginDTO";
import AuthService from "../application/services/AuthService";
import IController from "../interfaces/IController";

class LoginController implements IController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { username, password } = request.body as LoginDTO;
      const user = await this.authService.login({ username, password });
      return response.status(200).json({ user: user, message: "welcome" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return response.status(401).json({ error: error.message });
      }
      return response
        .status(401)
        .json({ error: "Invalid username or password" });
    }
  }
}

export default LoginController;
