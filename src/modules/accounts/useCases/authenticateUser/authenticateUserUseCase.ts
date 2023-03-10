import { compare } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import {sign} from 'jsonwebtoken'
import { AppError } from "@errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
    user: {
        name: string
        email: string
    },
    token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect");
    }

    const token = sign({}, "038549a84034e857695ced4b6ab65a19", {
        subject: user.id,
        expiresIn: "20d"
    });

    const tokenReturn: IResponse = {
        token,
        user: {
            name: user.name,
            email: user.email
        }
    }

    return tokenReturn
  }
}

export { AuthenticateUserUseCase };
