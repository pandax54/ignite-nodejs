import { container } from "tsyringe";

import { IMailProvider } from "./IMailProvider";
import { EtherealMailProvider } from "./implementions/EtherealMailProvider";
import { SESMailProvider } from "./implementions/SESMailProvider";

const mailProvider = {
  ethereal: container.resolve(EtherealMailProvider), // o proprio tsyinge instancia
  ses: container.resolve(SESMailProvider),
};

// nosso mail provider precisa ser injetado assim que a nossa aplicação inicia, pra conseguirmos criar nosso client
// nao é possível realizar isso pelo registerSingleton
container.registerInstance<IMailProvider>(
  "MailProvider",
  mailProvider[process.env.MAIL_PROVIDER]
  //   new EtherealMailProvider()
);
