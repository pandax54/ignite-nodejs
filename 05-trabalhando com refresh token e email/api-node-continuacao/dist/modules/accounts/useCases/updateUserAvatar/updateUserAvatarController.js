"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateUserAvatarController = void 0;

var _tsyringe = require("tsyringe");

var _updateUserAvatarUseCase = require("./updateUserAvatarUseCase");

class UpdateUserAvatarController {
  async handle(request, response) {
    const {
      id
    } = request.user; // const { avatar: avatar_file } = request;

    const avatar_file = request.file.filename;
    console.log(avatar_file); // receber arquivo pela rota

    const updateUserAvatarUseCase = _tsyringe.container.resolve(_updateUserAvatarUseCase.UpdateUserAvatarUseCase);

    await updateUserAvatarUseCase.execute({
      user_id: id,
      avatar_file
    });
    return response.status(204).send();
  }

}

exports.UpdateUserAvatarController = UpdateUserAvatarController;