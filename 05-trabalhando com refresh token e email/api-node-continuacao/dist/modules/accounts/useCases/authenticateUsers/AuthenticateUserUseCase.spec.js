"use strict";

var _UsersTokensRepositoryInMemory = require("../../repositories/in-memory/UsersTokensRepositoryInMemory");

var _DayjsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _UsersRepositoryInMemory = require("../../repositories/in-memory/UsersRepositoryInMemory");

var _CreateUserUseCase = require("../createUsers/CreateUserUseCase");

var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");

let authenticateUserUseCase;
let usersRepositoryInMemory;
let createUserUseCase;
let dateProvider;
let usersTokensRepositoryInMemory;
describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory);
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    authenticateUserUseCase = new _AuthenticateUserUseCase.AuthenticateUserUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider);
  });
  it("should be able to authenticate an user", async () => {
    const user = {
      driver_license: "9999",
      email: "email@rmail",
      name: "name",
      password: "1234"
    };
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    expect(result).toHaveProperty("token");
  });
  it("should not be able to authenticate an unregistered user", async () => {
    // esse iremos verificar pelo appError, dessa forma iremos colocar toda a função que esperamos ser rejeitada no rejects
    await expect(authenticateUserUseCase.execute({
      email: "false@email.com",
      password: "12345"
    })).rejects.toEqual(new _AppError.AppError("Email or password incorrect"));
  });
  it("should not be able to authenticate an user with wrong password", async () => {
    const newUser = {
      driver_license: "9999",
      email: "new@rmail",
      name: "name",
      password: "1234"
    };
    await createUserUseCase.execute(newUser);
    await expect(authenticateUserUseCase.execute({
      email: newUser.email,
      password: "incorectPassword"
    })).rejects.toEqual(new _AppError.AppError("Email or password incorrect"));
  });
});