import { getRepository, Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rentals/dto/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;
  constructor() {
    this.repository = getRepository(Rental);
  }
  async findByUser(user_id: string): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: { user_id },
      relations: ["car"], // trazer informacoes das tabelas relacionadas - colocar o nome do relacionamento
    });
    return rentals;
  }
  findById(id: string): Promise<Rental> {
    return this.repository.findOne(id);
  }
  async create({
    car_id,
    user_id,
    expected_return_date,
    end_date,
    total,
    id,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
      end_date,
      total,
      id,
    });

    await this.repository.save(rental);

    return rental;
  }
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: { car_id, end_date: null },
    });

    return rental;
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.repository.findOne({
      where: { user_id, end_date: null },
    });
  }
}

export { RentalsRepository };
