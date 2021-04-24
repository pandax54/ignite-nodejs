import { IGetBalanceDTO } from "@modules/statements/useCases/getBalance/IGetBalanceDTO";
import { ICreateUserDTO } from "@modules/users/useCases/createUser/ICreateUserDTO";

import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryStatementsRepository } from "@modules/statements/repositories/in-memory/InMemoryStatementsRepository";

import { CreateUserUseCase } from "@modules/users/useCases/createUser/CreateUserUseCase";
import { CreateStatementUseCase } from "@modules/statements/useCases/createStatement/CreateStatementUseCase";

import { GetBalanceError } from "./GetBalanceError"
import { GetBalanceUseCase } from "./GetBalanceUseCase";
import { OperationType } from "@modules/statements/entities/Statement";

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;
let createUserUseCase: CreateUserUseCase;
let createStatementUseCase: CreateStatementUseCase;
let getBalanceUseCase: GetBalanceUseCase


describe("Get balance", () => {
  beforeEach(async () => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    createStatementUseCase = new CreateStatementUseCase(inMemoryUsersRepository, inMemoryStatementsRepository)
    getBalanceUseCase = new GetBalanceUseCase(inMemoryStatementsRepository, inMemoryUsersRepository)

  });

  it("should not be able to list operations and balance of an user non existent", async () => {
    await expect(async () => {
      await getBalanceUseCase.execute({ user_id: "falseId123"})
    }).rejects.toBeInstanceOf(GetBalanceError)

    expect.assertions(1)
  })

  it("should be able to list all operations and balance of an user", async () => {
    const user: ICreateUserDTO = {
      name: "User name test",
      email: "user@test.com",
      password: "123456"
    };

    const userCreated = await createUserUseCase.execute(user);

    await createStatementUseCase.execute({
      user_id: userCreated.id,
      type: OperationType.DEPOSIT,
      amount: 1000,
      description: "cash deposit"
    })

    await createStatementUseCase.execute({
      user_id: userCreated.id,
      type: OperationType.DEPOSIT,
      amount: 500,
      description: "cash deposit"
    })

    await createStatementUseCase.execute({
      user_id: userCreated.id,
      type: OperationType.WITHDRAW,
      amount: 100,
      description: "cash out"
    })

    const result = await getBalanceUseCase.execute({ user_id: userCreated.id })

    const statements = result[Object.keys(result)[0]]
    const balance = result[Object.keys(result)[1]]

    expect(statements[0].user_id).toStrictEqual(userCreated.id)
    expect(statements[0].type).toEqual("deposit")
    expect(statements[0].amount).not.toEqual("1000")
    expect(statements[0].amount).toEqual(1000)
    expect(statements[0].description).toEqual("cash deposit")
    expect(balance).toEqual(1400)
  })
})
