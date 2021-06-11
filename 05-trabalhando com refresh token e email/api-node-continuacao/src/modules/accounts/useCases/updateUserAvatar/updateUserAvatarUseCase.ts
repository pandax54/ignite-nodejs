/**
 * adicionar coluna avatar na tabela de user
 * refatorar user com coluna avatar
 * configuração upload multer
 * criar regra de negócios do upload
 * criar controller
 */

import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

import { inject, injectable } from "tsyringe";

// import { deleteFile } from "../../../../utils/file";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
  avatar_file: string;
}
@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}
  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (user.avatar) {
      // se já existir um user.avatar, deletar, pois ele será substituído
      // await deleteFile(`./tmp/avatar/${user.avatar}`); // path + nome do arquivo
      await this.storageProvider.delete(user.avatar, "avatar"); // se já existir, deletar o avatar
    }

    await this.storageProvider.save(avatar_file, "avatar");
    user.avatar = avatar_file;

    // update com o avatar
    this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
