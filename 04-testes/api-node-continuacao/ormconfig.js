module.exports = {
  type: "postgres",
  host: "localhost",
  port: process.env.PORT_DB,
  username: "fernanda",
  password: "ignite",
  database: "rentx",
  migrations: ["./src/shared/infra/typeorm/database/migrations/*.ts"],
  entities: ["./src/modules/**/entities/*.ts"],
  cli: {
    migrationsDir: "./src/shared/infra/typeorm/database/migrations",
  },
};


