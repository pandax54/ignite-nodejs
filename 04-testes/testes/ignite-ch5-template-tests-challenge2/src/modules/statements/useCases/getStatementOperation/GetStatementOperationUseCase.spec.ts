import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { OperationType } from "../../entities/Statement";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";
import { GetStatementOperationUseCase } from "./GetStatementOperationUseCase";

let inMemoryStatementsRepository: InMemoryStatementsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let getStatementOperationUseCase: GetStatementOperationUseCase;
let createStatementUseCase: CreateStatementUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Get Statement Operation Use Case", () => {
  beforeEach(() => {
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    getStatementOperationUseCase = new GetStatementOperationUseCase(
      inMemoryUsersRepository,
      inMemoryStatementsRepository,
    );
    createStatementUseCase = new CreateStatementUseCase(
      inMemoryUsersRepository,
      inMemoryStatementsRepository
    );
    createUserUseCase = new CreateUserUseCase(
      inMemoryUsersRepository
    )
  });

  it("should not be able to get a statement with non-existed user", () => {
    expect(async () => {
      const { id: user_id } = await createUserUseCase.execute({
        email: 'user@user.com',
        name: 'user',
        password: '123456'
      });

      const { id: statement_id} = await createStatementUseCase.execute({
        amount: 100,
        description: "deposit",
        type: OperationType.DEPOSIT,
        user_id: user_id!
      });

      await getStatementOperationUseCase.execute({
        statement_id: statement_id!,
        user_id: 'wrong-user-id'
      })
    }).rejects.toBeInstanceOf(AppError)
  });

  it("should not be able to get a non existed statement", () => {
    expect(async () => {
      const { id: user_id } = await createUserUseCase.execute({
        email: 'user@user.com',
        name: 'user',
        password: '123456'
      });

      const { id: statement_id} = await createStatementUseCase.execute({
        amount: 100,
        description: "deposit",
        type: OperationType.DEPOSIT,
        user_id: user_id!
      });

      await getStatementOperationUseCase.execute({
        statement_id: 'wrong-statement-id',
        user_id: user_id!
      })
    }).rejects.toBeInstanceOf(AppError)
  });

  it("Should be able to get a statement", async () => {

      const { id: user_id } = await createUserUseCase.execute({
        email: 'user@user.com',
        name: 'user',
        password: '123456'
      });

      const { id: statement_id} = await createStatementUseCase.execute({
        amount: 100,
        description: "deposit",
        type: OperationType.DEPOSIT,
        user_id: user_id!
      });

      const getStatement = await getStatementOperationUseCase.execute({
        statement_id: statement_id!,
        user_id: user_id!
      })

      expect(getStatement).toHaveProperty("id");
      expect(getStatement.amount).toEqual(100);
  })
})
