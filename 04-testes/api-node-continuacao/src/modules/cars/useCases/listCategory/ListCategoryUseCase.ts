import { injectable, inject } from "tsyringe";

import { Category } from "../../infra/typeorm/entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

@injectable()
class ListCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(): Promise<Category[]> {
    return this.categoriesRepository.list();
  }
}

export { ListCategoryUseCase };
