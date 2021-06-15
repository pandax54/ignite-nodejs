"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAuthenticated = ensureAuthenticated;

var _jsonwebtoken = require("jsonwebtoken");

var _auth = _interopRequireDefault(require("../../../../config/auth"));

var _AppError = require("../../../errors/AppError");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new _AppError.AppError("Missing token", 401);
  } // desestruturar o Bearer token
  // [0] = Bearer, [1] = token
  // podemos ignora a posição zero


  const [, token] = authHeader.split(" "); // criar um array com duas posicoes separando pelo espaço

  try {
    const {
      sub: user_id
    } = (0, _jsonwebtoken.verify)(token, _auth.default.secret_token); // forçando o tipo
    // find the user
    // const usersRepository = new UsersRepository();
    // const user = await usersRepository.findById(user_id);
    // const usersTokensRepository = new UsersTokensRepository();
    // const user = await usersTokensRepository.findByUserIdAndRefreshToken(user_id,token);
    // if (!user) {
    //   throw new AppError("User does not exist", 404);
    // }

    request.user = {
      // precisaremos criar nossa propria tipagem no request
      id: user_id
    };
    return next();
  } catch (error) {
    throw new _AppError.AppError("Invalid token!", 401);
  }
}