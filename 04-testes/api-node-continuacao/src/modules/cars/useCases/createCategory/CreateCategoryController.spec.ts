import { hash } from "bcryptjs";
import { response } from "express";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuid } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm/database";

let connection: Connection;
describe("Create Category controller", () => {
  beforeEach(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    // criar um usuário administrador
    const id = uuid();
    const password = await hash("admin", 8);
    await connection.query(
      `INSERT INTO USERS(id, name, email, password, is_admin, driver_license)
          VALUES ('${id}', 'admin', 'admin@email.com', '${password}', true, '9999999')`
    );
  });
  it("Should be able to crate a new category", async () => {
    // geraremos a autenticação antes
    const responseToken = await request(app).post("/sessions").send({
      password: "admin",
      email: "admin@email.com",
    });

    await request(app).post("/categories").send({
      name: "Teste",
      description: "curso sobre nodejs",
    });

    expect(response.status).toBe(201);
  });
});
