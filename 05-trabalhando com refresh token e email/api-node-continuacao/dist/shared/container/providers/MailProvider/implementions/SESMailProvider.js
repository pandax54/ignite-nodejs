"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SESMailProvider = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _tsyringe = require("tsyringe");

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _dec, _dec2, _dec3, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://nodemailer.com/transports/ses/
const ses = new _awsSdk.default.SES({
  apiVersion: "2010-12-01",
  region: process.env.AWS_BUCKET_REGION
});
let SESMailProvider = (_dec = (0, _tsyringe.injectable)(), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = class SESMailProvider {
  constructor() {
    this.client = void 0;

    const transporter = _nodemailer.default.createTransport({
      SES: {
        ses,
        aws: _awsSdk.default
      }
    });

    this.client = transporter;
  }

  async sendMail(to, subject, variables, path) {
    // file -> string
    const templateFileContent = _fs.default.readFileSync(path).toString("utf-8"); // leitura da file


    const templateParse = _handlebars.default.compile(templateFileContent); // passar as variaveis para dentro do template


    const templateHTML = templateParse(variables); // send some mail

    this.client.sendMail({
      from: "Rentx <admin@fernandapenna.com>",
      to,
      subject,
      html: templateHTML
    }, (err, info) => {
      console.log(info);
    });
  }

}) || _class) || _class) || _class);
exports.SESMailProvider = SESMailProvider;