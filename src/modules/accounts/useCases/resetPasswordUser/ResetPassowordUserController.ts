import { Request, Response } from "express";
import { container } from "tsyringe";
import { ResetPassowordUserUseCase } from "./ResetPassowordUserUseCase";

class ResetPassowordUserController {
  async handle(request: Request, response: Response): Promise<Response> {

    const {token} = request.query;
    const {password} = request.body

    const resetPassowordUserUseCase = container.resolve(
      ResetPassowordUserUseCase
    );

    //forçando o token no formato string
    await resetPassowordUserUseCase.execute({token: String(token), password});

    return response.send();
  }
}

export { ResetPassowordUserController };
