"use strict";

var _bcryptjs = require("bcryptjs");

var _uuid = require("uuid");

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function create() {
  // chamamos a conexão e criamos nosso usuário administrador
  const connection = await (0, _index.default)("localhost");
  const id = (0, _uuid.v4)();
  const password = await (0, _bcryptjs.hash)("admin", 8);
  await connection.query(`INSERT INTO USERS(id, name, email, password, is_admin, driver_license)
        VALUES ('${id}', 'admin', 'admin@email.com', '${password}', true, '9999999')`); // precisamos fechar a nossa conexão

  await connection.close;
} // new Date().getTime()
// "isAdmin" -> case sensitive
// (id, name, email, password, "isAdmin", created_at, driver_license)
// ('${id}', 'admin', 'admin@email.com', '${password}', true, 'now()','9999999')


create().then(() => console.log("User admin created!"));