import { hash } from "bcryptjs";
import { v4 as uuid } from "uuid";

import createConnection from "../index";

async function create() {
  // chamamos a conexão e criamos nosso usuário administrador
  const connection = await createConnection("localhost");

  const id = uuid();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, is_admin, driver_license)
        VALUES ('${id}', 'admin', 'admin@email.com', '${password}', true, '9999999')`
  );

  // precisamos fechar a nossa conexão
  await connection.close;
}

// new Date().getTime()
// "isAdmin" -> case sensitive
// (id, name, email, password, "isAdmin", created_at, driver_license)
// ('${id}', 'admin', 'admin@email.com', '${password}', true, 'now()','9999999')

create().then(() => console.log("User admin created!"));
