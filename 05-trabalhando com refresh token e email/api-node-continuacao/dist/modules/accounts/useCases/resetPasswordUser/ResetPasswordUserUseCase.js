"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetPasswordUserUseCase = void 0;

var _bcryptjs = require("bcryptjs");

var _tsyringe = require("tsyringe");

var _IUsersRepository = require("../../repositories/IUsersRepository");

var _IUsersTokensRepository = require("../../repositories/IUsersTokensRepository");

var _IDateProvider = require("../../../../shared/container/providers/DateProvider/IDateProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

let ResetPasswordUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("UsersTokensRepository")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("DayjsDateProvider")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository, typeof _IUsersTokensRepository.IUsersTokensRepository === "undefined" ? Object : _IUsersTokensRepository.IUsersTokensRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class ResetPasswordUserUseCase {
  constructor(userRepository, usersTokensRepository, dateProvider) {
    this.userRepository = userRepository;
    this.usersTokensRepository = usersTokensRepository;
    this.dateProvider = dateProvider;
  }

  async execute({
    token,
    password
  }) {
    const usertoken = await this.usersTokensRepository.findByRefreshToken(token); // o token existe?

    if (!usertoken) {
      throw new _AppError.AppError("Token invalid!");
    } // o token é válido (tempo) - se true o token está expirado


    if (this.dateProvider.compareIfBefore(usertoken.expires_date, this.dateProvider.dateNow())) {
      throw new _AppError.AppError("Token expired!");
    } // precisaremos dos dados do usuário


    const user = await this.userRepository.findById(usertoken.user_id);
    console.log(user); // atualizar com a nova senha e criptografar

    user.password = await (0, _bcryptjs.hash)(password, 8); // update no user

    await this.userRepository.create(user); // deletar o token utilizado na alteração - segurança

    await this.usersTokensRepository.deleteById(usertoken.id);
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.ResetPasswordUserUseCase = ResetPasswordUserUseCase;