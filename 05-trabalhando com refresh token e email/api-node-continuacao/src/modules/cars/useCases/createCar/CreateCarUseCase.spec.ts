import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe("Create car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });
  it("Should be able to create a new car", async () => {
    await createCarUseCase.execute({
      name: "name",
      description: "description",
      daily_rate: 100,
      license_plate: "plate number",
      fine_amount: 100,
      brand: "brand",
      category_id: "category",
    });

    const car = await carsRepositoryInMemory.findByLicensePlate("plate number");
    expect(car).toHaveProperty("id");
    expect(car.available).toBe(true);
  });
  it("Should not be able to create a new car with a alredy registered license plate", async () => {
    await createCarUseCase.execute({
      name: "name",
      description: "description",
      daily_rate: 100,
      license_plate: "plate number",
      fine_amount: 100,
      brand: "brand",
      category_id: "category",
    });
    await expect(
      createCarUseCase.execute({
        name: "name",
        description: "description",
        daily_rate: 100,
        license_plate: "plate number",
        fine_amount: 100,
        brand: "brand",
        category_id: "category",
      })
    ).rejects.toEqual(new AppError("Car already registered!"));
  });
});
