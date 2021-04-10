module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "fernanda",
  password: "ignite",
  database: "rentx",
  migrations: ["./src/shared/infra/typeorm/database/migrations/*.ts"],
  entities: ["./src/modules/**/entities/*.ts"],
  cli: {
    migrationsDir: "./src/shared/infra/typeorm/database/migrations",
  },
};


