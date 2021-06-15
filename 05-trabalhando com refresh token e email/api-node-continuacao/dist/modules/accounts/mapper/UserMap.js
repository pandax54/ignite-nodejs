"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserMap = void 0;

var _classTransformer = require("class-transformer");

class UserMap {
  // pode ser usado sem precisar instanciar a classe
  static toDTO({
    email,
    name,
    id,
    avatar,
    driver_license,
    avatar_url
  }) {
    const user = (0, _classTransformer.classToClass)({
      email,
      name,
      id,
      avatar,
      driver_license,
      avatar_url
    });
    return user;
  }

}

exports.UserMap = UserMap;