import auth from "@config/auth";
import { AppError } from "@errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/respositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/respositories/UsersTokensRepositoy";
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
  const userTokensRepository = new UsersTokensRepository()

  if (!authHeader) {
    throw new AppError("Token Missing", 401);
  }

  //, ignora a posição 0 e joga o restante na variavel token
  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      auth.secret_refresh_token
    ) as IPayload;

    const user = await userTokensRepository.findByUserIdAndRefreshToken(user_id, token);

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
