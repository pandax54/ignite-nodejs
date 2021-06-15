"use strict";

var _UsersRepositoryInMemory = require("../../repositories/in-memory/UsersRepositoryInMemory");

var _UsersTokensRepositoryInMemory = require("../../repositories/in-memory/UsersTokensRepositoryInMemory");

var _DayjsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _MailProviderInMemory = require("../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory");

var _AppError = require("../../../../shared/errors/AppError");

var _SendForgotPasswordMailUseCase = require("./SendForgotPasswordMailUseCase");

let sendForgotPasswordMailUseCase;
let usersRepositoryInMemory;
let dateProvider;
let usersTokensRepositoryInMemory;
let mailProvider;
describe("Send forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    mailProvider = new _MailProviderInMemory.MailProviderInMemory();
    sendForgotPasswordMailUseCase = new _SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
  });
  it("should be able to send a forgot password mail to user", async () => {
    // se dentro da nossa requisicao esse sendMail for executado o spyOn irá identificar
    const sendMail = spyOn(mailProvider, "sendMail"); // criar um usuário fake

    await usersRepositoryInMemory.create({
      driver_license: "8877788",
      email: "fernanda@email.com",
      name: "Fernanda",
      password: "1234"
    });
    await sendForgotPasswordMailUseCase.execute("fernanda@email.com");
    expect(sendMail).toHaveBeenCalled();
  });
  it("should not be able to send a forgot password mail to not registered user", async () => {
    await expect(sendForgotPasswordMailUseCase.execute("fernanda@email.com")).rejects.toEqual(new _AppError.AppError("User does not exist!"));
  });
  it("should be able to generate an users token", async () => {
    const generateTokenMail = spyOn(usersTokensRepositoryInMemory, "create");
    await usersRepositoryInMemory.create({
      driver_license: "8877788",
      email: "fernanda2@email.com",
      name: "Fernanda",
      password: "1234"
    });
    await sendForgotPasswordMailUseCase.execute("fernanda2@email.com");
    expect(generateTokenMail).toHaveBeenCalled();
  });
});