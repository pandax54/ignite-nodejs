import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";

import { IMailProvider } from "../IMailProvider";

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;
  constructor() {
    // nao dá pra user async/await dentro do construtor
    nodemailer
      .createTestAccount()
      .then((account) => {
        // info da conta
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = transporter;
      })
      .catch((err) => console.error(err));
  }
  async sendMail(to: string, subject: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      from: "Rentx <noreplay@rentx.com.br>",
      to,
      subject,
      text: body,
      html: body,
    });

    console.log("Message sent: %s", message.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealMailProvider };
