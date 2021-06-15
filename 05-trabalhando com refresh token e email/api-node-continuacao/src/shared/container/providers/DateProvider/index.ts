import { container } from "tsyringe";

import { IDateProvider } from "./IDateProvider";
import { DayjsDateProvider } from "./implementations/DayjsDateProvider";

container.registerSingleton<IDateProvider>( // usamos a interface
  "DayjsDateProvider", // nome para o container
  DayjsDateProvider // classe que queremos chamar
);
