"use strict";

var _CarsRepositoryInMemory = require("../../repositories/in-memory/CarsRepositoryInMemory");

var _SpecificationsRepositoryInMemory = require("../../repositories/in-memory/SpecificationsRepositoryInMemory");

var _AppError = require("../../../../shared/errors/AppError");

var _CreateSpecificationUseCase = require("../createSpecification/CreateSpecificationUseCase");

var _CreateCarSpecificationUseCase = require("./CreateCarSpecificationUseCase");

let createCarSpecificationUseCase;
let carsRepositoryInMemory;
let specificationsRepositoryInMemory;
let createSpecificationUseCase;
describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new _SpecificationsRepositoryInMemory.SpecificationsRepositoryInMemory();
    createSpecificationUseCase = new _CreateSpecificationUseCase.CreateSpecificationUseCase(specificationsRepositoryInMemory);
    createCarSpecificationUseCase = new _CreateCarSpecificationUseCase.CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
  });
  it("should be able to create a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "name",
      description: "description",
      daily_rate: 100,
      license_plate: "plate number",
      fine_amount: 100,
      brand: "brand",
      category_id: "category"
    });
    const car_id = car.id;
    await createSpecificationUseCase.execute({
      name: "Specification name",
      description: "Specification description"
    });
    const specification = await specificationsRepositoryInMemory.findByName("Specification name");
    const specifications = [specification.id];
    const specificatonCar = await createCarSpecificationUseCase.execute({
      car_id,
      specifications_id: specifications
    });
    expect(specificatonCar).toHaveProperty("specifications");
    expect(specificatonCar.specifications.length).toBe(1);
  });
  it("should not be able to add a new specification to a non exitent car", async () => {
    const car_id = "123125";
    const specifications = ["11111"];
    await expect(createCarSpecificationUseCase.execute({
      car_id,
      specifications_id: specifications
    })).rejects.toEqual(new _AppError.AppError("Car does not exist!"));
  });
});