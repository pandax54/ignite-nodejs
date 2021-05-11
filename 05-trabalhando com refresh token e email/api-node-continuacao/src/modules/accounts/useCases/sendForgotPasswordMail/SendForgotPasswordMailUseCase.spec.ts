import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;
describe("Send forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });
  it("should be able to send a forgot password mail to user", async () => {
    // se dentro da nossa requisicao esse sendMail for executado o spyOn irá identificar
    const sendMail = spyOn(mailProvider, "sendMail");
    // criar um usuário fake
    await usersRepositoryInMemory.create({
      driver_license: "8877788",
      email: "fernanda@email.com",
      name: "Fernanda",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("fernanda@email.com");

    expect(sendMail).toHaveBeenCalled();
  });
  it("should not be able to send a forgot password mail to not registered user", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("fernanda@email.com")
    ).rejects.toEqual(new AppError("User does not exist!"));
  });

  it("should be able to generate an users token", async () => {
    const generateTokenMail = spyOn(usersTokensRepositoryInMemory, "create");

    await usersRepositoryInMemory.create({
      driver_license: "8877788",
      email: "fernanda2@email.com",
      name: "Fernanda",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("fernanda2@email.com");

    expect(generateTokenMail).toHaveBeenCalled();
  });
});
