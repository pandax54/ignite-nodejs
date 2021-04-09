import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private createUserRepository: IUsersRepository
  ) {}
  async execute({
    name,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const checkEmail = await this.createUserRepository.findByEmail(email);
    if (checkEmail) {
      throw new AppError("Username already registered");
    }

    const hashedPassword = await hash(password, 8);

    await this.createUserRepository.create({
      name,
      password: hashedPassword,
      email,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
