import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { ICreateUserDTO } from "@modules/users/useCases/createUser/ICreateUserDTO";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ShowUserProfileError } from "./ShowUserProfileError";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let showUserProfileUseCase: ShowUserProfileUseCase;

describe("Show User Profile", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    showUserProfileUseCase = new ShowUserProfileUseCase(
      inMemoryUsersRepository
    );
  });

  it("should be able to show a user information with authenticated user", async () => {
    const user: ICreateUserDTO = {
      name: "User name test",
      email: "user@test.com",
      password: "123456",
    };

    const userCreated = await createUserUseCase.execute(user);

    const userFound = await showUserProfileUseCase.execute(userCreated.id);

    expect(userCreated).toEqual(userFound);
  });

  it("should not be able to show a user information if non exists user id", async () => {
    expect(async () => {
      await showUserProfileUseCase.execute("abc123");
    }).rejects.toBeInstanceOf(ShowUserProfileError);
  });
});
