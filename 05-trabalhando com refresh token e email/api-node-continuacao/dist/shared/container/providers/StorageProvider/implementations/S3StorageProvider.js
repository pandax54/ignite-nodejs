"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.S3StorageProvider = void 0;

var _awsSdk = require("aws-sdk");

var _fs = _interopRequireDefault(require("fs"));

var _mime = _interopRequireDefault(require("mime"));

var _path = require("path");

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class S3StorageProvider {
  constructor() {
    this.client = void 0;
    this.client = new _awsSdk.S3({
      region: process.env.AWS_BUCKET_REGION
    });
  }

  async save(file, folder) {
    const originalName = (0, _path.resolve)(_upload.default.tmpFolder, file); // representação do nome (path) / todo upload parte inicialmente do tmp e depois mandaremos pra S3
    // fs -> leitura do arquivo (de fato o arquivo)

    const fileContent = await _fs.default.promises.readFile(originalName);

    const ContentType = _mime.default.getType(originalName);

    await this.client.putObject({
      Bucket: `${process.env.AWS_BUCKET}/${folder}`,
      // caminho dentro da S3 AWS
      Key: file,
      // file
      ACL: "public-read",
      // permissoes,
      Body: fileContent,
      // leitura do arquivo (de fato o arquivo)/ Buffer
      ContentType // sem isso ele fará download automático (yarn add mime -D) (yarn add @types/mime -D)

    }).promise();
    await _fs.default.promises.unlink(originalName); // deletar da pasta temporária

    return file;
  }

  async delete(file, folder) {
    this.client.deleteObject({
      Bucket: `${process.env.AWS_BUCKET}/${folder}`,
      // caminho dentro da S3 AWS
      Key: file // file

    }).promise();
  }

}

exports.S3StorageProvider = S3StorageProvider;