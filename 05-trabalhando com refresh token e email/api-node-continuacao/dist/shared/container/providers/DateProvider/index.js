"use strict";

var _tsyringe = require("tsyringe");

var _DayjsDateProvider = require("./implementations/DayjsDateProvider");

_tsyringe.container.registerSingleton( // usamos a interface
"DayjsDateProvider", // nome para o container
_DayjsDateProvider.DayjsDateProvider // classe que queremos chamar
);