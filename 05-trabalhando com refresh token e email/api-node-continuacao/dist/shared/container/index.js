"use strict";

var _tsyringe = require("tsyringe");

var _UsersTokensRepository = require("../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository");

var _CarsImageRepository = require("../../modules/cars/infra/typeorm/repositories/CarsImageRepository");

var _CarsRepository = require("../../modules/cars/infra/typeorm/repositories/CarsRepository");

var _SpecificationsRepository = require("../../modules/cars/infra/typeorm/repositories/SpecificationsRepository");

var _RentalsRepository = require("../../modules/rentals/infra/typeorm/repositories/RentalsRepository");

var _UsersRepository = require("../../modules/accounts/infra/typeorm/repositories/UsersRepository");

var _CategoriesRepository = require("../../modules/cars/infra/typeorm/repositories/CategoriesRepository");

require("./providers");

// ICategoryRepository -> daremos um nome para esse registro
// singleton porque só queremos uma instancia dele
_tsyringe.container.registerSingleton( // usamos a interface
"CategoriesRepository", // nome para o container
_CategoriesRepository.CategoriesRepository // classe que queremos chamar
);

_tsyringe.container.registerSingleton("SpecificationsRepository", _SpecificationsRepository.SpecificationsRepository);

_tsyringe.container.registerSingleton("UsersRepository", _UsersRepository.UsersRepository);

_tsyringe.container.registerSingleton("UsersTokensRepository", _UsersTokensRepository.UsersTokensRepository);

_tsyringe.container.registerSingleton("CarsRepository", _CarsRepository.CarsRepository);

_tsyringe.container.registerSingleton("CarsImageRepository", _CarsImageRepository.CarsImageRepository);

_tsyringe.container.registerSingleton("RentalsRepository", _RentalsRepository.RentalsRepository);