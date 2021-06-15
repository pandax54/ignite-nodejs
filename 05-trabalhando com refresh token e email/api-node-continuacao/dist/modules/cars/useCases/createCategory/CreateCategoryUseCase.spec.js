"use strict";

var _AppError = require("../../../../shared/errors/AppError");

var _CategoriesRepositoryInMemory = require("../../repositories/in-memory/CategoriesRepositoryInMemory");

var _CreateCategoryUseCase = require("./CreateCategoryUseCase");

let createCategoryUseCase;
let categoriesRepositoryInMemory;
describe("Criar categoria", () => {
  beforeAll(() => {
    categoriesRepositoryInMemory = new _CategoriesRepositoryInMemory.CategoriesRepositoryInMemory();
    createCategoryUseCase = new _CreateCategoryUseCase.CreateCategoryUseCase(categoriesRepositoryInMemory);
  });
  it("should be able to create category", async () => {
    // testes unitários nao tem responsabolidade de testar serviços externos como banco de dados
    // para isso criaremos repositórios fakes -> categoriesRepositoryInMemory
    const category = {
      name: "Category Test",
      description: "Category description Test"
    };
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    }); // como o nosso service nao retorna nada iremos verificar a criação do usuário dentro do repositório

    const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name); // com a criação nossa categoria passa a ter a propriedade id, entao iremos verificar se tudo ocorreu corretamente

    expect(categoryCreated).toHaveProperty("id");
  });
  it("should not be able to create category with the same name", async () => {
    const category = {
      name: "Category Test 2",
      description: "Category description Test"
    };
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });
    await expect(createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    })).rejects.toEqual(new _AppError.AppError("Category already registered!"));
  });
});