import { injectable } from "tsyringe";
import { IMailProvider } from "../IMailProvider";
import nodemailer, { Transporter } from "nodemailer";

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;
  constructor() {
    //infos da conta
    nodemailer
      .createTestAccount()
      .then((account) => {
        const trasporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = trasporter;
      })
      .catch((err) => console.log(err));
  }
  async sendMail(to: string, subject: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      to,
      from: "LmCars <noreplay@lmcars.com.br>",
      subject,
      text: body,
      html: body,
    });

    console.log("Message sent", message.messageId);
    console.log("preview URL", nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealMailProvider };
