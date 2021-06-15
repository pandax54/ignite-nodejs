"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCategoryUseCase = void 0;

var _tsyringe = require("tsyringe");

var _AppError = require("../../../../shared/errors/AppError");

var _ICategoriesRepository = require("../../repositories/ICategoriesRepository");

var _dec, _dec2, _dec3, _dec4, _class;

/**
 * [x] - definir o tipo de retorno
 * [x] - Alterar o retorno de erro
 * [x] - acessar o repositório
 */
let CreateCategoryUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CategoriesRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICategoriesRepository.ICategoriesRepository === "undefined" ? Object : _ICategoriesRepository.ICategoriesRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateCategoryUseCase {
  // principal of dependency inversion - nosso service nao precisa saber que tipo de repositório ou banco de dados estamos utilizando
  // https://app.rocketseat.com.br/node/chapter-ii-2/group/s-o-l-i-d/lesson/utilizando-o-principio-de-responsabilidade-unica-srp
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async execute({
    name,
    description
  }) {
    const categoryAlredyExists = await this.categoriesRepository.findByName(name);

    if (categoryAlredyExists) {
      throw new _AppError.AppError("Category already registered!");
    }

    this.categoriesRepository.create({
      name,
      description
    });
  }

}) || _class) || _class) || _class) || _class);
exports.CreateCategoryUseCase = CreateCategoryUseCase;