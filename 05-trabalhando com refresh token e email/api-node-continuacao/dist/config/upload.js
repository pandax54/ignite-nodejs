"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

var _multer = _interopRequireDefault(require("multer"));

var _path = require("path");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const tmpFolder = (0, _path.resolve)(__dirname, "..", "..", "tmp");
var _default = {
  tmpFolder,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  storage: _multer.default.diskStorage({
    destination: tmpFolder,
    // raiz do projeto - __dirname = referencia do folder atual
    filename: (request, file, callback) => {
      // sobrescrever o filename
      const fileHash = _crypto.default.randomBytes(16).toString("hex"); // criar um hash randomico


      const fileName = `${fileHash}-${file.originalname}`; // e concatenar com o nome do arquivo

      return callback(null, fileName); // (err, file)
    }
  })
};
exports.default = _default;