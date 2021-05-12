import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"
import { CreateUserUseCase } from "./CreateUserUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Create User Use Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  })
  it("should be able to create an user", async () => {
    const user = await createUserUseCase.execute({
      email: "newuser@user.com.br",
      name: "New User",
      password: "123456"
    });

    expect(user).toHaveProperty("id")
    expect(user.name).toEqual("New User")
  })

  it("should not be able to create 2 users with same email address",  () => {
    expect(async () => {
      await createUserUseCase.execute({
        email: "user@user.com",
        name: "user",
        password: "123456"
      });

      await createUserUseCase.execute({
        email: "user@user.com",
        name: "user",
        password: "123456"
      });
    }).rejects.toBeInstanceOf(AppError)
  })
})
