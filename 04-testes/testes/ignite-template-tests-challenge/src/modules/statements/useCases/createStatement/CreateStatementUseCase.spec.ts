import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryStatementsRepository } from "@modules/statements/repositories/in-memory/InMemoryStatementsRepository";

import { CreateUserUseCase } from "@modules/users/useCases/createUser/CreateUserUseCase";
import { CreateStatementUseCase } from "@modules/statements/useCases/createStatement/CreateStatementUseCase";

import { ICreateUserDTO } from "@modules/users/useCases/createUser/ICreateUserDTO";
import { ICreateStatementDTO } from "./ICreateStatementDTO";
import { OperationType, Statement } from "@modules/statements/entities/Statement";
import { CreateStatementError } from "./CreateStatementError";

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;
let createUserUseCase: CreateUserUseCase;
let createStatementUseCase: CreateStatementUseCase;

async function createFakeUser(username: string, email: string) {
  const user: ICreateUserDTO = {
    name: username,
    email: email,
    password: "123456"
  };

  const userCreated = await createUserUseCase.execute(user);

  return userCreated
}

describe("Create Statement", () => {
  beforeEach(async () => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    createStatementUseCase = new CreateStatementUseCase(inMemoryUsersRepository, inMemoryStatementsRepository)
  });

  it("should not be able to create statement of an user non existent", async () => {

    const statement: ICreateStatementDTO = {
      user_id: "falseId123",
      type: OperationType.DEPOSIT,
      amount: 100,
      description: "cash deposit"
    }

    await expect(async () => {
      await createStatementUseCase.execute(statement)
    }).rejects.toBeInstanceOf(CreateStatementError.UserNotFound)

    expect.assertions(1)
  })

  it("should be able to list an deposit type statement", async () => {
    const user = await createFakeUser("username 1", "username1@finapi.com")

    const deposit = await createStatementUseCase.execute({
      user_id: user.id,
      type: OperationType.DEPOSIT,
      amount: 1000,
      description: "cash deposit"
    })

    expect(deposit).toHaveProperty("id")
    expect(deposit.user_id).toEqual(user.id)
    expect(deposit.type).toEqual("deposit")

  })

  it("should be able to list an withdraw type statement", async () => {
    const user = await createFakeUser("username 2", "username2@finapi.com")

    await createStatementUseCase.execute({
      user_id: user.id,
      type: OperationType.DEPOSIT,
      amount: 1000,
      description: "cash deposit"
    })

    const withdraw = await createStatementUseCase.execute({
      user_id: user.id,
      type: OperationType.WITHDRAW,
      amount: 500,
      description: "cash out"
    })

    expect(withdraw).toHaveProperty("id")
    expect(withdraw.user_id).toEqual(user.id)
    expect(withdraw.type).toEqual("withdraw")
  })

  it("should not be able to make an withdraw type statement if the withdraw is greater than the balance", async () => {

    const user = await createFakeUser("username 3", "username3@finapi.com")

    await createStatementUseCase.execute({
      user_id: user.id,
      type: OperationType.DEPOSIT,
      amount: 100,
      description: "cash deposit"
    })

    const withdraw = {
      user_id: user.id,
      type: OperationType.WITHDRAW,
      amount: 101,
      description: "cash out"
    }

    await expect(async () => {
      await createStatementUseCase.execute(withdraw)
    }).rejects.toBeInstanceOf(CreateStatementError.InsufficientFunds)
  })
})
