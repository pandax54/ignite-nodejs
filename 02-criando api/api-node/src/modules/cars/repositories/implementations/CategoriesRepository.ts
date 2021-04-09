import { Category } from "../../model/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

// singleton - apenas uma instancia de uma classe para ser uma instancia global

class CategoriesRepository implements ICategoriesRepository {
  // https://www.guru99.com/java-static-variable-methods.html#:~:text=Static%20method%20in%20Java%20is,static%20data%20(instance%20variables).
  private static INSTANCE: CategoriesRepository;

  private categories: Category[];

  // new - para criar novas instancias nao será mais possível. Somente a própria classe conseguirá chamar o construtor
  private constructor() {
    this.categories = [];
  }

  // método responsável por criar uma instancia ou utilizar uma já existente
  public static getInstance(): CategoriesRepository {
    // se o valor de instance for diferente de null
    if (!CategoriesRepository.INSTANCE) {
      // aí instanciaremos
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }
    // caso contrário retornaremos a já existente
    return CategoriesRepository.INSTANCE;
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
  }
  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }
}

export { CategoriesRepository };
