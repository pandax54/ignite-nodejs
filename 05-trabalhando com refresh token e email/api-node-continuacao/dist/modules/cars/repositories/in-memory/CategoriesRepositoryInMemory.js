"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoriesRepositoryInMemory = void 0;

var _Category = require("../../infra/typeorm/entities/Category");

class CategoriesRepositoryInMemory {
  constructor() {
    this.categories = [];
  }

  async findByName(name) {
    const category = this.categories.find(category => category.name === name);
    return category;
  }

  async list() {
    const list = this.categories;
    return list;
  }

  async create({
    name,
    description
  }) {
    const user = new _Category.Category();
    Object.assign(user, {
      name,
      description
    });
    this.categories.push(user);
  }

}

exports.CategoriesRepositoryInMemory = CategoriesRepositoryInMemory;