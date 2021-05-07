import { ICreateCarsDTO } from "@modules/cars/dtos/ICreateCarsDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];
  async updateAvailable(id: string, available: boolean): Promise<void> {
    const car = this.cars.find((car) => car.id === id);
    car.available = available;
    // alternative
    // const findIndex = this.cars.findIndex((car) => car.id === id);
    // this.cars[findIndex].available = available;
  }
  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find((car) => car.license_plate === license_plate);
    return car;
  }
  async list(): Promise<Car[]> {
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
    id,
  }: ICreateCarsDTO): Promise<Car> {
    const car = new Car();

    if (id) {
      Object.assign(car, {
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
        id,
      });
    } else {
      Object.assign(car, {
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
      });
    }

    this.cars.push(car);

    return car;
  }
  async findAvailable(
    name?: string,
    brand?: string,
    category_id?: string
  ): Promise<Car[]> {
    return this.cars.filter(
      (car) =>
        car.available === true &&
        ((brand && car.brand === "brand") ||
          (name && car.name === name) ||
          (category_id && car.category_id === category_id))
    );
  }
}

export { CarsRepositoryInMemory };
