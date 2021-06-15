"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecificationsRepositoryInMemory = void 0;

var _Specification = require("../../infra/typeorm/entities/Specification");

class SpecificationsRepositoryInMemory {
  constructor() {
    this.specifications = [];
  }

  async create({
    name,
    description
  }) {
    const specification = new _Specification.Specification();
    Object.assign(specification, {
      name,
      description
    });
    this.specifications.push(specification);
  }

  async findByName(name) {
    return this.specifications.find(specification => specification.name === name);
  }

  async list() {
    return this.specifications;
  }

  async findByIds(ids) {
    return this.specifications.filter(specification => ids.includes(specification.id));
  }

}

exports.SpecificationsRepositoryInMemory = SpecificationsRepositoryInMemory;