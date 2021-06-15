"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersTokensRepository = void 0;

var _typeorm = require("typeorm");

var _UserTokens = require("../entities/UserTokens");

class UsersTokensRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_UserTokens.UserTokens);
  }

  async findByRefreshToken(refresh_token) {
    const userToken = await this.repository.findOne({
      refresh_token
    });
    return userToken;
  }

  async deleteById(id) {
    await this.repository.delete(id);
  }

  async findByUserIdAndRefreshToken(user_id, refresh_token) {
    // cada user pode ter mais de um token cadastrado no banco de dados
    const usersToken = await this.repository.findOne({
      user_id,
      refresh_token
    });
    return usersToken;
  }

  async create({
    expires_date,
    refresh_token,
    user_id
  }) {
    const userToken = await this.repository.create({
      expires_date,
      refresh_token,
      user_id
    });
    await this.repository.save(userToken);
    return userToken;
  }

}

exports.UsersTokensRepository = UsersTokensRepository;