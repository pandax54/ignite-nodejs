import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

/**
 * [x] - definir o tipo de retorno
 * [x] - Alterar o retorno de erro
 * [x] - acessar o repositório
 */

class CreateCategoryUseCase {
  // principal of dependency inversion - nosso service nao precisa saber que tipo de repositório ou banco de dados estamos utilizando
  // https://app.rocketseat.com.br/node/chapter-ii-2/group/s-o-l-i-d/lesson/utilizando-o-principio-de-responsabilidade-unica-srp
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ name, description }: IRequest): void {
    const categoryAlredyExists = this.categoriesRepository.findByName(name);
    if (categoryAlredyExists) {
      throw new Error("Category already registered!");
    }
    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
