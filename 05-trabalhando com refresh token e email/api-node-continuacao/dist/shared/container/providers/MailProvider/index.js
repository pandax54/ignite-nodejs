"use strict";

var _tsyringe = require("tsyringe");

var _EtherealMailProvider = require("./implementions/EtherealMailProvider");

var _SESMailProvider = require("./implementions/SESMailProvider");

const mailProvider = {
  ethereal: _tsyringe.container.resolve(_EtherealMailProvider.EtherealMailProvider),
  // o proprio tsyinge instancia
  ses: _tsyringe.container.resolve(_SESMailProvider.SESMailProvider)
}; // nosso mail provider precisa ser injetado assim que a nossa aplicação inicia, pra conseguirmos criar nosso client
// nao é possível realizar isso pelo registerSingleton

_tsyringe.container.registerInstance("MailProvider", mailProvider[process.env.MAIL_PROVIDER] //   new EtherealMailProvider()
);