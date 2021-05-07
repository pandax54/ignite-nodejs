import { compare } from "bcryptjs";
import { request } from "express";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

// session - autenticação de usuário
// dependency injection - UsersRepository
@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private authenticateUserRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    // validar email - usuário existe?
    const user = await this.authenticateUserRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Email or password incorrect");
    }
    // validar senha
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError("Email or password incorrect");
    }

    // ===========================TOKEN AUTH=======================================
    const {
      secret_token,
      expires_in_token,
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = auth;
    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    }); // md5hash

    const refresh_token = sign({ email }, secret_refresh_token, {
      // email como payload - podemos inserir dentro do token
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      expires_refresh_token_days
    );

    await this.usersTokensRepository.create({
      expires_date: refresh_token_expires_date,
      refresh_token,
      user_id: user.id,
    });

    // =========================================================================

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
      refresh_token,
    };

    return tokenReturn;
    // gerar jsonwebtoken
  }
}

export { AuthenticateUserUseCase };
