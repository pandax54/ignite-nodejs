import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let inMemoryUsersRepository: InMemoryUsersRepository;
let authenticateUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User Use Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    authenticateUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository);
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  })

  it("should not be able to login with a wrong email", () => {
    expect(async () => {
      await createUserUseCase.execute({
        email: "user@user.com",
        name: "User",
        password: "123456"
      });

      await authenticateUseCase.execute({
        email: "wrongemail@user.com",
        password: "123456"
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to login with a wrong password", () => {
    expect(async () => {
      await createUserUseCase.execute({
        email: "user@user.com",
        name: "User",
        password: "123456"
      });

      await authenticateUseCase.execute({
        email: "user@user.com",
        password: "wrong-password"
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should able to login",async () => {

    await createUserUseCase.execute({
        email: "user@user.com",
        name: "User",
        password: "123456"
      });

    const payload = await authenticateUseCase.execute({
        email: "user@user.com",
        password: "123456"
      });

    expect(payload.user).toHaveProperty("id")
    expect(payload).toHaveProperty("token")
  })
})
