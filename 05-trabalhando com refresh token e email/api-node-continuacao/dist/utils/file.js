"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteFile = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const deleteFile = async filename => {
  try {
    await _fs.default.promises.stat(filename); // verifica se um arquivo existe ou nao
  } catch {
    // eslint-disable-next-line prettier/prettier
    return;
  }

  await _fs.default.promises.unlink(filename); // deletar file armazenada na pasta temporária
};

exports.deleteFile = deleteFile;