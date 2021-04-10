import { getRepository, Repository } from "typeorm";

import { ICreateCarsDTO } from "@modules/cars/dtos/ICreateCarsDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { Car } from "../typeorm/entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate });

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
  }: ICreateCarsDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    await this.repository.save(car);

    return car;
  }
  async list(): Promise<Car[]> {
    const car = await this.repository.find();
    return car;
  }
}

export { CarsRepository };
