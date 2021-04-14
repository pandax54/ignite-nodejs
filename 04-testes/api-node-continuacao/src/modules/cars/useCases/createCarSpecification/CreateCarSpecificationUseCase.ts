import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

// @injectable()
class CreateCarSpecificationUseCase {
  constructor(
    // @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    private specificationRepository: ISpecificationsRepository
  ) {}
  async execute({ car_id, specifications_id }: IRequest): Promise<void> {
    const car = await this.carsRepository.findById(car_id);

    if (!car) {
      throw new AppError("Car does not exist!");
    }

    // identificar as specifications pelo id
    const specifications = await this.specificationRepository.findByIds(
      specifications_id
    );

    // atribuir os valores das specifications ao carro
    car.specifications = specifications;

    // dar update nos valores do carro
    await this.carsRepository.create(car);
  }
}

export { CreateCarSpecificationUseCase };
