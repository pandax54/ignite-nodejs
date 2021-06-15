"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepositoryInMemory = void 0;

var _Car = require("../../infra/typeorm/entities/Car");

class CarsRepositoryInMemory {
  constructor() {
    this.cars = [];
  }

  async updateAvailable(id, available) {
    const car = this.cars.find(car => car.id === id);
    car.available = available; // alternative
    // const findIndex = this.cars.findIndex((car) => car.id === id);
    // this.cars[findIndex].available = available;
  }

  async findById(id) {
    return this.cars.find(car => car.id === id);
  }

  async findByLicensePlate(license_plate) {
    const car = this.cars.find(car => car.license_plate === license_plate);
    return car;
  }

  async list() {
    const list = this.cars;
    return list;
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    id
  }) {
    const car = new _Car.Car();

    if (id) {
      Object.assign(car, {
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
        id
      });
    } else {
      Object.assign(car, {
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id
      });
    }

    this.cars.push(car);
    return car;
  }

  async findAvailable(name, brand, category_id) {
    return this.cars.filter(car => car.available === true && (brand && car.brand === "brand" || name && car.name === name || category_id && car.category_id === category_id));
  }

}

exports.CarsRepositoryInMemory = CarsRepositoryInMemory;