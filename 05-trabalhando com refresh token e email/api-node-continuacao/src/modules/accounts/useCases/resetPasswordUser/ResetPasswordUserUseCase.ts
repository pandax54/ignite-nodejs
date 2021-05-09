import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}
  async execute({ token, password }: IRequest): Promise<void> {
    const usertoken = await this.usersTokensRepository.findByRefreshToken(
      token
    );

    // o token existe?
    if (!usertoken) {
      throw new AppError("Token invalid!");
    }

    // o token é válido (tempo) - se true o token está expirado
    if (
      this.dateProvider.compareIfBefore(
        usertoken.expires_date,
        this.dateProvider.dateNow()
      )
    ) {
      throw new AppError("Token expired!");
    }

    // precisaremos dos dados do usuário
    const user = await this.userRepository.findById(usertoken.user_id);
    console.log(user);

    // atualizar com a nova senha e criptografar
    user.password = await hash(password, 8);

    // update no user
    await this.userRepository.create(user);

    // deletar o token utilizado na alteração - segurança
    await this.usersTokensRepository.deleteById(usertoken.id);
  }
}

export { ResetPasswordUserUseCase };
