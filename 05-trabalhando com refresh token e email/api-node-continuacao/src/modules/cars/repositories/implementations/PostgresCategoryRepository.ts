import { getRepository, Repository } from "typeorm";

import { Category } from "../../infra/typeorm/entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  // https://www.guru99.com/java-static-variable-methods.html#:~:text=Static%20method%20in%20Java%20is,static%20data%20(instance%20variables).
  // private static INSTANCE: CategoriesRepository;
  private repository: Repository<Category>;

  // new - para criar novas instancias nao será mais possível. Somente a própria classe conseguirá chamar o construtor
  // remover private do constructor()
  constructor() {
    this.repository = getRepository(Category);
  }

  // // método responsável por criar uma instancia ou utilizar uma já existente
  // public static getInstance(): CategoriesRepository {
  //   // se o valor de instance for diferente de null
  //   if (!CategoriesRepository.INSTANCE) {
  //     // aí instanciaremos
  //     CategoriesRepository.INSTANCE = new CategoriesRepository();
  //   }
  //   // caso contrário retornaremos a já existente
  //   return CategoriesRepository.INSTANCE;
  // }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    // const category = new Category();
    // Object.assign(category, {
    //   name,
    //   description,
    //   created_at: new Date(),
    // });
    const category = this.repository.create({
      name,
      description,
    });

    await this.repository.save(category);
  }
  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    // select * from categories where name  = "name"
    const category = await this.repository.findOne({ name });

    return category;
  }
}

export { CategoriesRepository };
