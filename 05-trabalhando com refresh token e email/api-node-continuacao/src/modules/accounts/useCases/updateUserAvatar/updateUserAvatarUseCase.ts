/**
 * adicionar coluna avatar na tabela de user
 * refatorar user com coluna avatar
 * configuração upload multer
 * criar regra de negócios do upload
 * criar controller
 */

import { inject, injectable } from "tsyringe";

import { deleteFile } from "../../../../utils/file";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
  avatar_file: string;
}
@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (user.avatar) {
      // se já existir um user.avatar, deletar, pois ele será substituído
      await deleteFile(`./tmp/avatar/${user.avatar}`); // path + nome do arquivo
    }
    user.avatar = avatar_file;
    console.log(avatar_file);

    // update com o avatar
    this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
