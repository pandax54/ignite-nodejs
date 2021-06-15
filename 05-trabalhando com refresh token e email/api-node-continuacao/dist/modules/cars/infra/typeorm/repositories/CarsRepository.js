"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepository = void 0;

var _typeorm = require("typeorm");

var _Car = require("../entities/Car");

class CarsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Car.Car);
  }

  async updateAvailable(id, available) {
    await this.repository.createQueryBuilder().update().set({
      available
    }).where("id = :id", {
      id
    }) //   .setParameters({ id })
    .execute(); // update cars set available = :available where where id = :id
  }

  findById(id) {
    return this.repository.findOne(id);
  }

  async findAvailable(name, brand, category_id) {
    const carsQuery = this.repository.createQueryBuilder("c") // alias - nome da tabela
    .where("available = :available", {
      available: true
    });

    if (brand) {
      carsQuery.andWhere("c.brand = :brand", {
        brand
      });
    }

    if (name) {
      carsQuery.andWhere("c.name = :name", {
        name
      });
    }

    if (category_id) {
      carsQuery.andWhere("c.category_id = :category_id", {
        category_id
      });
    }

    const cars = await carsQuery.getMany();
    return cars;
  }

  async findByLicensePlate(license_plate) {
    const car = await this.repository.findOne({
      license_plate
    });
    return car;
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
    id
  }) {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
      id
    });
    await this.repository.save(car);
    return car;
  }

  async list() {
    const car = await this.repository.find();
    return car;
  }

}

exports.CarsRepository = CarsRepository;