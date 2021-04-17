import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";

container.registerSingleton<IDateProvider>( // usamos a interface
  "DayjsDateProvider", // nome para o container
  DayjsDateProvider // classe que queremos chamar
);
