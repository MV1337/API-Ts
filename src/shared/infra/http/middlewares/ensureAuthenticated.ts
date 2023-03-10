import { AppError } from "@errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/respositories/UsersRepository";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token Missing", 401);
  }

  //, ignora a posição 0 e joga o restante na variavel token
  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "038549a84034e857695ced4b6ab65a19"
    ) as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User does not exists", 401);
    }

    request.user = {
      id: user_id
    }

    next();
  } catch (error) {
    throw new AppError("Invalid Token", 401);
  }
}
