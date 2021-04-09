import { Category } from "../../entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];
  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }
  async list(): Promise<Category[]> {
    const list = this.categories;
    return list;
  }
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const user = new Category();
    Object.assign(user, {
      name,
      description,
    });

    this.categories.push(user);
  }
}

export { CategoriesRepositoryInMemory };
