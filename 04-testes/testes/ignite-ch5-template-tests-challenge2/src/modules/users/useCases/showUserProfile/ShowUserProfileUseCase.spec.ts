
import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let showUserProfileUseCase: ShowUserProfileUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Show User Profile Use Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    showUserProfileUseCase = new ShowUserProfileUseCase(inMemoryUsersRepository);
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);

  })
  it("should not be able to show a non-existed user", () => {
    expect(async () => {
      await showUserProfileUseCase.execute('non-exist-user')
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should be able to show a user profile that exists", async () => {
    const user = await createUserUseCase.execute({
      email: 'newuser@user.com',
      name: 'new user',
      password: '123456'
    });


    const userProfile = await showUserProfileUseCase.execute(user.id!);

    expect(userProfile).toEqual(user);
    expect(userProfile).toHaveProperty("id");
  })
})
