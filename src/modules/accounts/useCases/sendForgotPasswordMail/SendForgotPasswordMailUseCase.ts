import { AppError } from "@errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserstokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUserstokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider
  ) {}
  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User does not exists");
    }

    const token = uuidV4();

    const expires_date = this.dateProvider.addDays(3);

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date: expires_date,
    });

    await this.mailProvider.sendMail(
      email,
      "Recuperação de senha",
      `O link para o reset é ${token}`
    );
  }
}

export { SendForgotPasswordMailUseCase };
