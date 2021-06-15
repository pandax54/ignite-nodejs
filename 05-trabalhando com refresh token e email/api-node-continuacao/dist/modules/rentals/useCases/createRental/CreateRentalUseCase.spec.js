"use strict";

var _dayjs = _interopRequireDefault(require("dayjs"));

var _CarsRepositoryInMemory = require("../../../cars/repositories/in-memory/CarsRepositoryInMemory");

var _RentalsRepositoryInMemory = require("../../repositories/in-memory/RentalsRepositoryInMemory");

var _DayjsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _CreateRentalUseCase = require("./CreateRentalUseCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let createRentalUseCase;
let rentalsRepositoryInMemory;
let dateProvider;
let carsRepository;
describe("Create Rental", () => {
  const dayAdd24Hours = (0, _dayjs.default)().add(1, "day").toDate();
  beforeEach(() => {
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    carsRepository = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    rentalsRepositoryInMemory = new _RentalsRepositoryInMemory.RentalsRepositoryInMemory();
    createRentalUseCase = new _CreateRentalUseCase.CreateRentalUseCase(rentalsRepositoryInMemory, dateProvider, carsRepository);
  });
  it("should be able to create a new rental", async () => {
    const car = await carsRepository.create({
      name: "Marca X",
      description: "curso",
      daily_rate: 140,
      license_plate: "def-9934",
      fine_amount: 100,
      brand: "AudiX",
      category_id: "0e835f7e-cb88-4566-b1ab-7391bf451fa8"
    });
    const list = await carsRepository.list();
    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "12345",
      expected_return_date: dayAdd24Hours
    });
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });
  it("should not be able to create a new rental when car is not available", async () => {
    const car = await carsRepository.create({
      name: "Marca X",
      description: "curso",
      daily_rate: 140,
      license_plate: "def-9934",
      fine_amount: 100,
      brand: "AudiX",
      category_id: "0e835f7e-cb88-4566-b1ab-7391bf451fa8"
    });
    await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "1111",
      expected_return_date: dayAdd24Hours
    });
    await expect(createRentalUseCase.execute({
      car_id: car.id,
      user_id: "12345",
      expected_return_date: dayAdd24Hours
    })).rejects.toEqual(new _AppError.AppError("Car is unavailable."));
  });
  it("should not be able to create a new rental when user already has an open rental", async () => {
    const car = await carsRepository.create({
      name: "Marca X",
      description: "curso",
      daily_rate: 140,
      license_plate: "def-9934",
      fine_amount: 100,
      brand: "AudiX",
      category_id: "0e835f7e-cb88-4566-b1ab-7391bf451fa8"
    });
    const car_two = await carsRepository.create({
      name: "Marca X2",
      description: "curso llLl",
      daily_rate: 140,
      license_plate: "def-99334",
      fine_amount: 100,
      brand: "AudiX",
      category_id: "0e835f7e-cb88-4566-b1ab-7391bf451fa8"
    });
    await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "12345",
      expected_return_date: dayAdd24Hours
    });
    await expect(createRentalUseCase.execute({
      car_id: car_two.id,
      user_id: "12345",
      expected_return_date: dayAdd24Hours
    })).rejects.toEqual(new _AppError.AppError("There's a rental in progress for user!"));
  });
  it("should not be able to create a new rental with invalid return time", async () => {
    const car = await carsRepository.create({
      name: "Marca X",
      description: "curso",
      daily_rate: 140,
      license_plate: "def-9934",
      fine_amount: 100,
      brand: "AudiX",
      category_id: "0e835f7e-cb88-4566-b1ab-7391bf451fa8"
    });
    await expect(createRentalUseCase.execute({
      car_id: car.id,
      user_id: "12345",
      expected_return_date: (0, _dayjs.default)().toDate()
    })).rejects.toEqual(new _AppError.AppError("Invalid return!"));
  });
});