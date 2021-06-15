"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecificationsRepository = void 0;

var _typeorm = require("typeorm");

var _Specification = require("../entities/Specification");

class SpecificationsRepository {
  // private specifications: Specification[];
  // private static INSTACE: SpecificationsRepository;
  // private constructor() {
  //   this.specifications = [];
  // }
  // public static getInstance() {
  //   if (!SpecificationsRepository.INSTACE) {
  //     SpecificationsRepository.INSTACE = new SpecificationsRepository();
  //   }
  //   return SpecificationsRepository.INSTACE;
  // }
  // new - para criar novas instancias nao será mais possível. Somente a própria classe conseguirá chamar o construtor
  // remover private do constructor()
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Specification.Specification);
  }

  async findByIds(ids) {
    const specifications = await this.repository.findByIds(ids);
    return specifications;
  }

  async findByName(name) {
    const specification = await this.repository.findOne({
      name
    });
    return specification;
  }

  async create({
    name,
    description
  }) {
    // const specification = new Specification();
    // Object.assign(specification, {
    //   name,
    //   description,
    //   created_at: new Date(),
    // });
    const specification = this.repository.create({
      name,
      description
    });
    await this.repository.save(specification);
  }

  async list() {
    return this.repository.find();
  }

}

exports.SpecificationsRepository = SpecificationsRepository;