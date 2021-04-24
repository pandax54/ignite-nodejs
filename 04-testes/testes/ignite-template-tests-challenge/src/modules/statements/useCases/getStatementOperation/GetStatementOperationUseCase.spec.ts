import { ICreateUserDTO } from "@modules/users/useCases/createUser/ICreateUserDTO";

import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryStatementsRepository } from "@modules/statements/repositories/in-memory/InMemoryStatementsRepository";

import { CreateUserUseCase } from "@modules/users/useCases/createUser/CreateUserUseCase";
import { CreateStatementUseCase } from "@modules/statements/useCases/createStatement/CreateStatementUseCase";

import { GetStatementOperationUseCase } from "./GetStatementOperationUseCase";
import { GetStatementOperationError } from "./GetStatementOperationError";
import { OperationType } from "@modules/statements/entities/Statement";

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;
let createUserUseCase: CreateUserUseCase;
let createStatementUseCase: CreateStatementUseCase;
let getStatementOperationUseCase: GetStatementOperationUseCase

describe("Get Statements", () => {
  beforeEach(async () => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    createStatementUseCase = new CreateStatementUseCase(inMemoryUsersRepository, inMemoryStatementsRepository)
    getStatementOperationUseCase = new GetStatementOperationUseCase(inMemoryUsersRepository, inMemoryStatementsRepository)

  });

  it("should not be able to list statement of an user non existent", async () => {

    const user: ICreateUserDTO = {
      name: "User 1",
      email: "user@test.com",
      password: "123456"
    };

    const userCreated = await createUserUseCase.execute(user);

    const statement = await createStatementUseCase.execute({
      user_id: userCreated.id,
      type: OperationType.DEPOSIT,
      amount: 1000,
      description: "cash deposit"
    })

    await expect(async () => {
      await getStatementOperationUseCase.execute({ user_id: "falseId123", statement_id: statement.id})
    }).rejects.toBeInstanceOf(GetStatementOperationError.UserNotFound)

    expect.assertions(1)
  })

  it("should not be able to list an statement non existent", async () => {

    const user: ICreateUserDTO = {
      name: "User 2",
      email: "user@test.com",
      password: "123456"
    };

    const userCreated = await createUserUseCase.execute(user);

    await expect(async () => {
      await getStatementOperationUseCase.execute({ user_id: userCreated.id, statement_id: "123"})
    }).rejects.toBeInstanceOf(GetStatementOperationError.StatementNotFound)

    expect.assertions(1)
  })
})
