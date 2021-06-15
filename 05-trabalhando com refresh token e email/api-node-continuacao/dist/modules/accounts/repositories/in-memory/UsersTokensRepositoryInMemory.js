"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersTokensRepositoryInMemory = void 0;

var _UserTokens = require("../../infra/typeorm/entities/UserTokens");

class UsersTokensRepositoryInMemory {
  constructor() {
    this.usersTokens = [];
  }

  async create({
    expires_date,
    refresh_token,
    user_id
  }) {
    const usersToken = new _UserTokens.UserTokens();
    Object.assign(_UserTokens.UserTokens, {
      expires_date,
      refresh_token,
      user_id
    });
    this.usersTokens.push(usersToken);
    return usersToken;
  }

  async findByUserIdAndRefreshToken(user_id, refresh_token) {
    return this.usersTokens.find(token => token.user_id === user_id && token.refresh_token === refresh_token);
  }

  async deleteById(id) {
    const userToken = this.usersTokens.find(token => token.id === id);
    const userTokenIndex = this.usersTokens.indexOf(userToken);
    this.usersTokens.splice(userTokenIndex, 1);
  }

  async findByRefreshToken(refresh_token) {
    return this.usersTokens.find(token => token.refresh_token === refresh_token);
  }

}

exports.UsersTokensRepositoryInMemory = UsersTokensRepositoryInMemory;