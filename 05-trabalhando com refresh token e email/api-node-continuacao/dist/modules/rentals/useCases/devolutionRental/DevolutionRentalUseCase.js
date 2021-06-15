"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DevolutionRentalUseCase = void 0;

var _tsyringe = require("tsyringe");

var _ICarsRepository = require("../../../cars/repositories/ICarsRepository");

var _IRentalsRepository = require("../../repositories/IRentalsRepository");

var _IDateProvider = require("../../../../shared/container/providers/DateProvider/IDateProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

let DevolutionRentalUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("RentalsRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("CarsRepository")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("DayjsDateProvider")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IRentalsRepository.IRentalsRepository === "undefined" ? Object : _IRentalsRepository.IRentalsRepository, typeof _ICarsRepository.ICarsRepository === "undefined" ? Object : _ICarsRepository.ICarsRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class DevolutionRentalUseCase {
  constructor(rentalsRepository, carsRepository, dateProvider) {
    this.rentalsRepository = rentalsRepository;
    this.carsRepository = carsRepository;
    this.dateProvider = dateProvider;
  }

  async execute({
    id,
    user_id
  }) {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);
    const minimunDaily = 1;

    if (!rental) {
      throw new _AppError.AppError("Rentals does not exists!");
    } // verificar o tempo de aluguel - horário atual


    const dateNow = this.dateProvider.dateNow(); // quantas diárias - mínimo de 1 (se entregar antes de 24 horas será comprada uma diária)

    let daily = this.dateProvider.compareInDays(rental.start_date, this.dateProvider.dateNow());

    if (daily <= 0) {
      daily = minimunDaily;
    } // calcular atraso - para cobrança de multa


    const delay = this.dateProvider.compareInDays(rental.expected_return_date, dateNow);
    let total = 0; // resultado das multas/atraso

    if (delay > 0) {
      const additionalCharge = delay * car.fine_amount;
      total = additionalCharge;
    } // adicionar as multas ao total de diárias


    total += daily * car.daily_rate; // atualizar o end_date (devolução)

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total; // update

    await this.rentalsRepository.create(rental); // update carro agora available novamente com a devolução

    await this.carsRepository.updateAvailable(car.id, true);
    return rental;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.DevolutionRentalUseCase = DevolutionRentalUseCase;