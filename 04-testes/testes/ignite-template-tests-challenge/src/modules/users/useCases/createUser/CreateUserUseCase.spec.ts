import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { AppError } from "../../../../shared/errors/AppError";

import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe("Create User", () => {

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to create a new user", async () => {
    const user = {
      name: "User name",
      email: "username@test.com",
      password: "123456"
    };

    const userCreated = await createUserUseCase.execute({
      name: user.name,
      email: user.email,
      password: user.password
    });

    expect(userCreated).toHaveProperty("id");
  });

 it("should not be able to create a new user with email exists", async () => {
  expect(async () => {

    const user = {
      name: "User name",
      email: "username@test2.com",
      password: "123456"
    };

    await createUserUseCase.execute({
      name: user.name,
      email: user.email,
      password: user.password
    });

    await createUserUseCase.execute({
      name: user.name,
      email: user.email,
      password: user.password
    });

  }).rejects.toBeInstanceOf(AppError);
  });
})
