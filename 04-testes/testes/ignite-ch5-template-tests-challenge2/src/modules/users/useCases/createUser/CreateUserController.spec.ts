import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { app } from "../../../../app";

import createConnection from "../../../../database";


let connection: Connection;

describe("Create User Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();

    const id = uuidv4();
    const password = await hash("financial", 8);

    await connection.query(
      `INSERT INTO users(id, name, email, password, created_at, updated_at)
       VALUES('${id}', 'financial', 'financial@finapi.com', '${password}', 'now()', 'now()')
      `
      );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a new user", async () => {
    const responseUser = await request(app).post("/api/v1/users").send({
      name: "new User",
      email: "newuser@user.com",
      password: "user password",
    });

    expect(responseUser.status).toBe(201);
  });

  it("Should not be able to create a user twice, with the same email", async () => {
    const responseUser = await request(app).post("/api/v1/users").send({
      name: "financial2",
      email: "financial@finapi.com",
      password: "financial2"
    });

    expect(responseUser.status).toBe(400);
    expect(responseUser.body.message).toBe("User already exists")
  });



})
