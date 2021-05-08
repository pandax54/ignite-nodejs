import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
  email: string; // colocamos dentro do nosso payload
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}
  async execute(token: string): Promise<string> {
    // verificação do refresh token - se ele existe e se ele é válido como jsonwebtoken
    const { sub, email } = verify(token, auth.secret_refresh_token) as IPayload;
    // precisamos ter acesso ao user portador desse token
    const user_id = sub;

    // veriricar se esse refresh token existe no nosso banco de dados e se está vinculado a esse user
    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );

    if (!userToken) {
      throw new AppError("Refresh Token Error!");
    }

    // se ele existir iremos removê-lo
    // iremos deletar esse token para criar um novo -refresh token (atualização de autenticação)
    await this.usersTokensRepository.deleteById(userToken.id);

    // geraremos um novo token - usando a mesma lógica que usamos no AuthenticateUserUseCase
    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      // email como payload - podemos inserir dentro do token
      subject: user_id, // decode.sub
      expiresIn: auth.expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      auth.expires_refresh_token_days
    );

    await this.usersTokensRepository.create({
      expires_date: refresh_token_expires_date,
      refresh_token,
      user_id,
    });

    return refresh_token;
  }
}

export { RefreshTokenUseCase };
