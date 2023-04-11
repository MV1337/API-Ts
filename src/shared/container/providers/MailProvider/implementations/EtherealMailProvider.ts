import { injectable } from "tsyringe";
import { IMailProvider } from "../IMailProvider";
import nodemailer, { Transporter } from "nodemailer";
import fs from "fs";
import handlebars from "handlebars";

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
  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: "LmCars <noreplay@lmcars.com.br>",
      subject,
      html: templateHTML,
    });

    console.log("Message sent", message.messageId);
    console.log("preview URL", nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealMailProvider };
