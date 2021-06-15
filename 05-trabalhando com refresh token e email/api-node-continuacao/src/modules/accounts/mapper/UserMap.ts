import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { classToClass } from "class-transformer"; // nos permite manipular as info que estao expose
import { IUserResponseDTO } from "../dtos/IUserResponseDTO";

class UserMap {
  // pode ser usado sem precisar instanciar a classe
  static toDTO({
    email,
    name,
    id,
    avatar,
    driver_license,
    avatar_url,
  }: User): IUserResponseDTO {
    const user = classToClass({
      email,
      name,
      id,
      avatar,
      driver_license,
      avatar_url,
    });
    return user;
  }
}

export { UserMap };
