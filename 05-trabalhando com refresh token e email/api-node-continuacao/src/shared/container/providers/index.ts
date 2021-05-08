import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementions/EtherealMailProvider";

// nosso mail provider precisa ser injetado assim que a nossa aplicação inicia, pra conseguirmos criar nosso client
// nao é possível realizar isso pelo registerSingleton
container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
);

container.registerSingleton<IDateProvider>( // usamos a interface
  "DayjsDateProvider", // nome para o container
  DayjsDateProvider // classe que queremos chamar
);
