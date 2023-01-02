import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@errors/AppError"
import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    driver_license,
    password,
  }: ICreateUsersDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User Already exists");
    }

    const passwordHash = await hash(password, 10);

    await this.usersRepository.create({
      name,
      email,
      driver_license,
      password: passwordHash,
    });
  }
}

export { CreateUserUseCase };
