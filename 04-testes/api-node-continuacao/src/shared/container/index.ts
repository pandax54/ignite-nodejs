import { container } from "tsyringe";

import { CarsImageRepository } from "@modules/cars/infra/repositories/CarsImageRepository";
import { CarsRepository } from "@modules/cars/infra/repositories/CarsRepository";
import { SpecificationsRepository } from "@modules/cars/infra/repositories/SpecificationsRepository";
import { ICarsImageRepository } from "@modules/cars/repositories/ICarsImageRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { UsersRepository } from "../../modules/accounts/infra/repositories/UsersRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { CategoriesRepository } from "../../modules/cars/infra/repositories/CategoriesRepository";
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificationsRepository";

// ICategoryRepository -> daremos um nome para esse registro
// singleton porque só queremos uma instancia dele
container.registerSingleton<ICategoriesRepository>( // usamos a interface
  "CategoriesRepository", // nome para o container
  CategoriesRepository // classe que queremos chamar
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);

container.registerSingleton<ICarsImageRepository>(
  "CarsImageRepository",
  CarsImageRepository
);
