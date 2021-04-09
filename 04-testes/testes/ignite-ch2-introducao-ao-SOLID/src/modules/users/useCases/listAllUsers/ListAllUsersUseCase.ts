import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const checkUserExistence = this.usersRepository.findById(user_id);

    if (!checkUserExistence) {
      throw new Error("User does not exist");
    }

    if (!checkUserExistence.admin) {
      throw new Error("User is not authorized!");
    }

    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };
