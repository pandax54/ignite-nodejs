"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRentalUseCase = void 0;

var _dayjs = _interopRequireDefault(require("dayjs"));

var _utc = _interopRequireDefault(require("dayjs/plugin/utc"));

var _tsyringe = require("tsyringe");

var _ICarsRepository = require("../../../cars/repositories/ICarsRepository");

var _IRentalsRepository = require("../../repositories/IRentalsRepository");

var _IDateProvider = require("../../../../shared/container/providers/DateProvider/IDateProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dayjs.default.extend(_utc.default);

let CreateRentalUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("RentalsRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("DayjsDateProvider")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("CarsRepository")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IRentalsRepository.IRentalsRepository === "undefined" ? Object : _IRentalsRepository.IRentalsRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider, typeof _ICarsRepository.ICarsRepository === "undefined" ? Object : _ICarsRepository.ICarsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateRentalUseCase {
  constructor(rentalsRepository, dateProvider, carsRepository) {
    this.rentalsRepository = rentalsRepository;
    this.dateProvider = dateProvider;
    this.carsRepository = carsRepository;
  }

  async execute({
    car_id,
    user_id,
    expected_return_date
  }) {
    const minimunHours = 24; // const checkcarAvailableRental = await this.rentalsRepository.findOpenRentalByCar(
    //   car_id
    // );

    const carAvailable = await this.carsRepository.findById(car_id);

    if (!carAvailable.available) {
      throw new _AppError.AppError("Car is unavailable.");
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);
    const start_date = this.dateProvider.dateNow();
    const compare = this.dateProvider.compareInHours(start_date, expected_return_date);

    if (compare < minimunHours) {
      // o aluguel deve ter duração mínima de 24 horas
      throw new _AppError.AppError("Invalid return!");
    }

    if (rentalOpenToUser) {
      throw new _AppError.AppError("There's a rental in progress for user!");
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date
    });
    await this.carsRepository.updateAvailable(car_id, false); // status do carro agora é unavailable

    return rental;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.CreateRentalUseCase = CreateRentalUseCase;