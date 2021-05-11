import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuid } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm/database";

let connection: Connection;
describe("List Category controller", () => {
  beforeAll(async () => {
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

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to list all the category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@email.com",
      password: "admin",
    });

    const { refresh_token } = responseToken.body;

    await request(app)
      .post("/categories")
      .send({
        name: "Test category",
        description: "Test description",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("Test category");
  });
});
