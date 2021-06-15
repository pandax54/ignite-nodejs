"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserUseCase = void 0;

var _bcryptjs = require("bcryptjs");

var _tsyringe = require("tsyringe");

var _AppError = require("../../../../shared/errors/AppError");

var _IUsersRepository = require("../../repositories/IUsersRepository");

var _dec, _dec2, _dec3, _dec4, _class;

let CreateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateUserUseCase {
  constructor(createUserRepository) {
    this.createUserRepository = createUserRepository;
  }

  async execute({
    name,
    password,
    email,
    driver_license
  }) {
    const checkEmail = await this.createUserRepository.findByEmail(email);

    if (checkEmail) {
      throw new _AppError.AppError("Username already registered");
    }

    const hashedPassword = await (0, _bcryptjs.hash)(password, 8);
    await this.createUserRepository.create({
      name,
      password: hashedPassword,
      email,
      driver_license
    });
  }

}) || _class) || _class) || _class) || _class);
exports.CreateUserUseCase = CreateUserUseCase;