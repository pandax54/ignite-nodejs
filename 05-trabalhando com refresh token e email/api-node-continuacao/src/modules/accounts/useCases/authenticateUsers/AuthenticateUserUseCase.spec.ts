import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUsers/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
  });
  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "9999",
      email: "email@rmail",
      name: "name",
      password: "1234",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate an unregistered user", () => {
    // esse iremos verificar pelo appError, dessa forma iremos colocar toda a função que esperamos ser rejeitada no rejects
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "12345",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate an user with wrong password", () => {
    expect(async () => {
      const newUser: ICreateUserDTO = {
        driver_license: "9999",
        email: "new@rmail",
        name: "name",
        password: "1234",
      };
      await createUserUseCase.execute(newUser);
      await authenticateUserUseCase.execute({
        email: newUser.email,
        password: "incorectPassword",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
