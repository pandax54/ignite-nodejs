import { AppError } from "../../../../errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
describe("Criar categoria", () => {
  beforeAll(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });
  it("should be able to create category", async () => {
    // testes unitários nao tem responsabolidade de testar serviços externos como banco de dados
    // para isso criaremos repositórios fakes -> categoriesRepositoryInMemory
    const category = {
      name: "Category Test",
      description: "Category descrption Test",
    };
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });
    // como o nosso service nao retorna nada iremos verificar a criação do usuário dentro do repositório
    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    // com a criação nossa categoria passa a ter a propriedade id, entao iremos verificar se tudo ocorreu corretamente
    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able to create category with the same name", async () => {
    expect(async () => {
      const category = {
        name: "Category Test",
        description: "Category descrption Test",
      };
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
