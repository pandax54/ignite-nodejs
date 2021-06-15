"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefreshTokenUseCase = void 0;

var _jsonwebtoken = require("jsonwebtoken");

var _tsyringe = require("tsyringe");

var _auth = _interopRequireDefault(require("../../../../config/auth"));

var _IUsersTokensRepository = require("../../repositories/IUsersTokensRepository");

var _IDateProvider = require("../../../../shared/container/providers/DateProvider/IDateProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let RefreshTokenUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersTokensRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("DayjsDateProvider")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersTokensRepository.IUsersTokensRepository === "undefined" ? Object : _IUsersTokensRepository.IUsersTokensRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class RefreshTokenUseCase {
  constructor(usersTokensRepository, dateProvider) {
    this.usersTokensRepository = usersTokensRepository;
    this.dateProvider = dateProvider;
  }

  async execute(refresh_token) {
    // verificação do refresh token - se ele existe e se ele é válido como jsonwebtoken
    const {
      sub,
      email
    } = (0, _jsonwebtoken.verify)(refresh_token, _auth.default.secret_refresh_token); // precisamos ter acesso ao user portador desse token

    const user_id = sub; // veriricar se esse refresh token existe no nosso banco de dados e se está vinculado a esse user

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, refresh_token);

    if (!userToken) {
      throw new _AppError.AppError("Refresh Token Error!");
    } // se ele existir iremos removê-lo
    // iremos deletar esse token para criar um novo -refresh token (atualização de autenticação)


    await this.usersTokensRepository.deleteById(userToken.id); // geraremos um novo token - usando a mesma lógica que usamos no AuthenticateUserUseCase

    const new_refresh_token = (0, _jsonwebtoken.sign)({
      email
    }, _auth.default.secret_refresh_token, {
      // email como payload - podemos inserir dentro do token
      subject: user_id,
      // decode.sub
      expiresIn: _auth.default.expires_in_refresh_token
    });
    const refresh_token_expires_date = this.dateProvider.addDays(_auth.default.expires_refresh_token_days);
    await this.usersTokensRepository.create({
      expires_date: refresh_token_expires_date,
      refresh_token: new_refresh_token,
      user_id
    });
    const newToken = (0, _jsonwebtoken.sign)({}, _auth.default.secret_token, {
      // email como payload - podemos inserir dentro do token
      subject: user_id,
      // decode.sub
      expiresIn: _auth.default.expires_in_token
    });
    return {
      token: newToken,
      refresh_token: new_refresh_token
    };
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.RefreshTokenUseCase = RefreshTokenUseCase;