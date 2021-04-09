import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
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
}

// session - autenticação de usuário
// dependency injection - UsersRepository
@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private authenticateUserRepository: IUsersRepository
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    // validar email - usuário existe?
    const user = await this.authenticateUserRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Email or password incorrect");
    }
    // validar senha
    const passwordMatch = compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError("Email or password incorrect");
    }
    const token = sign({}, "secret", {
      subject: user.id,
      expiresIn: "1d",
    }); // md5hash

    return { user: { name: user.name, email: user.email }, token };
    // gerar jsonwebtoken
  }
}

export { AuthenticateUserUseCase };
