"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoriesRepository = void 0;

var _typeorm = require("typeorm");

var _Category = require("../../infra/typeorm/entities/Category");

class CategoriesRepository {
  // https://www.guru99.com/java-static-variable-methods.html#:~:text=Static%20method%20in%20Java%20is,static%20data%20(instance%20variables).
  // private static INSTANCE: CategoriesRepository;
  // new - para criar novas instancias nao será mais possível. Somente a própria classe conseguirá chamar o construtor
  // remover private do constructor()
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Category.Category);
  } // // método responsável por criar uma instancia ou utilizar uma já existente
  // public static getInstance(): CategoriesRepository {
  //   // se o valor de instance for diferente de null
  //   if (!CategoriesRepository.INSTANCE) {
  //     // aí instanciaremos
  //     CategoriesRepository.INSTANCE = new CategoriesRepository();
  //   }
  //   // caso contrário retornaremos a já existente
  //   return CategoriesRepository.INSTANCE;
  // }


  async create({
    name,
    description
  }) {
    // const category = new Category();
    // Object.assign(category, {
    //   name,
    //   description,
    //   created_at: new Date(),
    // });
    const category = this.repository.create({
      name,
      description
    });
    await this.repository.save(category);
  }

  async list() {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name) {
    // select * from categories where name  = "name"
    const category = await this.repository.findOne({
      name
    });
    return category;
  }

}

exports.CategoriesRepository = CategoriesRepository;