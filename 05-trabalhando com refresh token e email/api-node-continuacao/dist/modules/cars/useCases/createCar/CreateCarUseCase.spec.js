"use strict";

var _CarsRepositoryInMemory = require("../../repositories/in-memory/CarsRepositoryInMemory");

var _AppError = require("../../../../shared/errors/AppError");

var _CreateCarUseCase = require("./CreateCarUseCase");

let createCarUseCase;
let carsRepositoryInMemory;
describe("Create car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    createCarUseCase = new _CreateCarUseCase.CreateCarUseCase(carsRepositoryInMemory);
  });
  it("Should be able to create a new car", async () => {
    await createCarUseCase.execute({
      name: "name",
      description: "description",
      daily_rate: 100,
      license_plate: "plate number",
      fine_amount: 100,
      brand: "brand",
      category_id: "category"
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
      category_id: "category"
    });
    await expect(createCarUseCase.execute({
      name: "name",
      description: "description",
      daily_rate: 100,
      license_plate: "plate number",
      fine_amount: 100,
      brand: "brand",
      category_id: "category"
    })).rejects.toEqual(new _AppError.AppError("Car already registered!"));
  });
});