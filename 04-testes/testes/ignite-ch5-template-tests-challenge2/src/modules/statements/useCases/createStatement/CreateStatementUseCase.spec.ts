import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { OperationType } from "../../entities/Statement";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository"
import { CreateStatementUseCase } from "./CreateStatementUseCase";

let inMemoryStatementsRepository: InMemoryStatementsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let createStatementUseCase: CreateStatementUseCase;
let createUserUseCase: CreateUserUseCase;



describe("Create Statement Use Case", () => {
  beforeEach(() => {
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createStatementUseCase = new CreateStatementUseCase(
      inMemoryUsersRepository,
      inMemoryStatementsRepository);
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  })

  it("should not be able to create a statement without a valid user", () => {
    expect(async () => {
      await createStatementUseCase.execute({
        amount: 200.0,
        description: "New Statement",
        user_id: "non-exist-user",
        type: OperationType.DEPOSIT,
      })
    }).rejects.toBeInstanceOf(AppError)
  });

  it("should not be able to do a withdraw without enough balance", () => {
    expect(async () => {
      const { id } = await createUserUseCase.execute({
        email: "user@user.com",
        name: "user",
        password: "123456"
      });

      await createStatementUseCase.execute({
        amount: 100.00,
        description: "deposit",
        type: OperationType.DEPOSIT,
        user_id: id!,
      });

      await createStatementUseCase.execute({
        amount: 200.00,
        description: "invalid withdraw",
        type: OperationType.WITHDRAW,
        user_id: id!,
      })


    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to create a statement", async () => {
    const { id } = await createUserUseCase.execute({
      email: "user@user.com",
      name: "user",
      password: "123456"
    });

    const statement = await createStatementUseCase.execute({
      amount: 100.00,
      description: "deposit",
      type: OperationType.DEPOSIT,
      user_id: id!,
    });

    expect(statement).toHaveProperty("id")
    expect(statement.amount).toEqual(100.00)
  })


})
