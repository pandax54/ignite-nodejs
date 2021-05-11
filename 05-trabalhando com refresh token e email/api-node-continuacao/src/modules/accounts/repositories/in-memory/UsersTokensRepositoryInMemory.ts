import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";

import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserTokens[] = [];
  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const usersToken = new UserTokens();

    Object.assign(UserTokens, {
      expires_date,
      refresh_token,
      user_id,
    });

    this.usersTokens.push(usersToken);

    return usersToken;
  }
  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    return this.usersTokens.find(
      (token) =>
        token.user_id === user_id && token.refresh_token === refresh_token
    );
  }
  async deleteById(id: string): Promise<void> {
    const userToken = this.usersTokens.find((token) => token.id === id);
    const userTokenIndex = this.usersTokens.indexOf(userToken);
    this.usersTokens.splice(userTokenIndex, 1);
  }
  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    return this.usersTokens.find(
      (token) => token.refresh_token === refresh_token
    );
  }
}

export { UsersTokensRepositoryInMemory };
