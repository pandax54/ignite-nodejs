import { ICreateCarsDTO } from "@modules/cars/dtos/ICreateCarsDTO";
import { Cars } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Cars[] = [];
  async findByLicensePlate(license_plate: string): Promise<Cars> {
    const car = this.cars.find((car) => car.license_plate === license_plate);
    return car;
  }
  async list(): Promise<Cars[]> {
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
  }: ICreateCarsDTO): Promise<void> {
    const cars = new Cars();

    Object.assign(cars, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    this.cars.push(cars);
  }
}

export { CarsRepositoryInMemory };
