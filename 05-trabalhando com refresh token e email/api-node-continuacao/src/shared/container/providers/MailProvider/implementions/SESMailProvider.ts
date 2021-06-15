import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";
import aws from "aws-sdk";

import { IMailProvider } from "../IMailProvider";

// https://nodemailer.com/transports/ses/
const ses = new aws.SES({
  apiVersion: "2010-12-01",
  region: process.env.AWS_BUCKET_REGION,
});

@injectable()
class SESMailProvider implements IMailProvider {
  private client: Transporter;
  constructor() {
    const transporter = nodemailer.createTransport({
      SES: { ses, aws },
    });
    this.client = transporter;
  }
  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    // file -> string
    const templateFileContent = fs.readFileSync(path).toString("utf-8");
    // leitura da file
    const templateParse = handlebars.compile(templateFileContent);
    // passar as variaveis para dentro do template
    const templateHTML = templateParse(variables);

    // send some mail
    this.client.sendMail(
      {
        from: "Rentx <admin@fernandapenna.com>",
        to,
        subject,
        html: templateHTML,
      },
      (err, info) => {
        console.log(info);
      }
    );
  }
}

export { SESMailProvider };
