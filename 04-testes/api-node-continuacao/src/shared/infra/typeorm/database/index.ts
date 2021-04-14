import { Connection, createConnection, getConnectionOptions } from "typeorm";

// interface IOptions {
//   host: string;
// }

// getConnectionOptions().then((options) => {
//   const newOptions = options as IOptions;
//   newOptions.host = "database"; // Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
//   createConnection({
//     ...options,
//   });
// });
// import no server.ts
// import "../typeorm/database";

export default async (host = "database"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  return createConnection(Object.assign(defaultOptions, { host })); // "database"/ "localhost"
};
// import no server.ts - precisaremos criar a conexão
// import createConnection from "../typeorm/database";
// createConnection();
