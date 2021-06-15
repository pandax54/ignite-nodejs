"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RentalsRepository = void 0;

var _typeorm = require("typeorm");

var _Rental = require("../entities/Rental");

class RentalsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Rental.Rental);
  }

  async findByUser(user_id) {
    const rentals = await this.repository.find({
      where: {
        user_id
      },
      relations: ["car"] // trazer informacoes das tabelas relacionadas - colocar o nome do relacionamento

    });
    return rentals;
  }

  findById(id) {
    return this.repository.findOne(id);
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
    end_date,
    total,
    id
  }) {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
      end_date,
      total,
      id
    });
    await this.repository.save(rental);
    return rental;
  }

  async findOpenRentalByCar(car_id) {
    const rental = await this.repository.findOne({
      where: {
        car_id,
        end_date: null
      }
    });
    return rental;
  }

  async findOpenRentalByUser(user_id) {
    return this.repository.findOne({
      where: {
        user_id,
        end_date: null
      }
    });
  }

}

exports.RentalsRepository = RentalsRepository;