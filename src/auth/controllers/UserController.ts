import { Request, Response } from "express";

import GetUserDTO from "../application/data/GetUserDTO";
import AuthService from "../application/services/AuthService";
import IController from "../interfaces/IController";

class UserController implements IController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const dto: GetUserDTO = { id: Number(id) };
      const user = await this.authService.getUserById(dto);
      return response.status(200).json(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return response.status(404).json({ error: error.message });
      }
      return response.status(404).json({ error: "User not found error" });
    }
  }
}

export default UserController;
