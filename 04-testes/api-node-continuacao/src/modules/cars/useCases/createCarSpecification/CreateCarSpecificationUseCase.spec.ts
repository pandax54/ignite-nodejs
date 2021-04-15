import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateSpecificationUseCase } from "../createSpecification/CreateSpecificationUseCase";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let createSpecificationUseCase: CreateSpecificationUseCase;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createSpecificationUseCase = new CreateSpecificationUseCase(
      specificationsRepositoryInMemory
    );
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });
  it("should be able to create a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "name",
      description: "description",
      daily_rate: 100,
      license_plate: "plate number",
      fine_amount: 100,
      brand: "brand",
      category_id: "category",
    });
    const car_id = car.id;
    await createSpecificationUseCase.execute({
      name: "Specification name",
      description: "Specification description",
    });

    const specification = await specificationsRepositoryInMemory.findByName(
      "Specification name"
    );

    const specifications = [specification.id];
    const specificatonCar = await createCarSpecificationUseCase.execute({
      car_id,
      specifications_id: specifications,
    });
    console.log(specificatonCar);

    expect(specificatonCar).toHaveProperty("specifications");
    expect(specificatonCar.specifications.length).toBe(1);
  });

  it("should not be able to add a new specification to a non exitent car", async () => {
    expect(async () => {
      const car_id = "123125";
      const specifications = ["11111"];
      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id: specifications,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
