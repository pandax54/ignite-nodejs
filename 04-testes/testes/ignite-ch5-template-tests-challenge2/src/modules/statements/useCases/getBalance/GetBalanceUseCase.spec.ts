import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { OperationType } from "../../entities/Statement";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";
import { GetBalanceUseCase } from "./GetBalanceUseCase";

let inMemoryStatementsRepository: InMemoryStatementsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let getBalanceUseCase: GetBalanceUseCase;
let createStatementUseCase: CreateStatementUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Get Balance Use Case", () => {
  beforeEach(() => {
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    getBalanceUseCase = new GetBalanceUseCase(
      inMemoryStatementsRepository,
      inMemoryUsersRepository
      );
    createStatementUseCase = new CreateStatementUseCase(
      inMemoryUsersRepository,
      inMemoryStatementsRepository);
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("Should not be able to get balance without existed user", () => {
    expect(async () => {
      await getBalanceUseCase.execute({
        user_id: '123456'
      });
    }).rejects.toBeInstanceOf(AppError);
  })

  it("Should be able to get users balance", async () => {
    const { id } = await createUserUseCase.execute({
      name: 'user',
      email: 'user@user.com',
      password: '123456'
    });

    await createStatementUseCase.execute({
      amount: 100,
      description: 'statement test',
      type: OperationType.DEPOSIT,
      user_id: id!,
    });

    const statement = await getBalanceUseCase.execute({
      user_id: id!
    });

    expect(statement.statement.length).toEqual(1);
    expect(statement.balance).toEqual(100);
  })
})
