"use strict";

var _CarsRepositoryInMemory = require("../../repositories/in-memory/CarsRepositoryInMemory");

var _ListAvailableCarsUseCase = require("./ListAvailableCarsUseCase");

let listAvailableCarsUseCase;
let carsRepositoryInMemory;
describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    listAvailableCarsUseCase = new _ListAvailableCarsUseCase.ListAvailableCarsUseCase(carsRepositoryInMemory);
  });
  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "name",
      description: "description",
      daily_rate: 100,
      license_plate: "plate number",
      fine_amount: 100,
      brand: "brand",
      category_id: "category"
    });
    const cars = await listAvailableCarsUseCase.execute({
      brand: "brand"
    });
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "name",
      description: "description",
      daily_rate: 100,
      license_plate: "plate number",
      fine_amount: 100,
      brand: "brand",
      category_id: "category"
    });
    const cars = await listAvailableCarsUseCase.execute({
      name: "name"
    });
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "name",
      description: "description",
      daily_rate: 100,
      license_plate: "plate number",
      fine_amount: 100,
      brand: "brand",
      category_id: "category"
    });
    const cars = await listAvailableCarsUseCase.execute({
      category_id: "category"
    });
    expect(cars).toEqual([car]);
  });
});