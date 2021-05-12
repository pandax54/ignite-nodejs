import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { app } from "../../../../app";

import createConnection from "../../../../database";


let connection: Connection;

describe("Authenticate User Controller", () => {
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


  it("Should not be able to authenticate with a wrong email", async () => {
    const responseAuthentication = await request(app).post("/api/v1/sessions").send({
      email: "wronguseremail@user.com",
      password: "financial",
    });


    expect(responseAuthentication.status).toBe(401);
    expect(responseAuthentication.body.message).toBe("Incorrect email or password");
  });

  it("Should not be able to authenticate with a wrong password", async () => {
    const responseAuthentication = await request(app).post("/api/v1/sessions").send({
      email: "financial@finapi.com",
      password: "wrong-password",
    });

    expect(responseAuthentication.status).toBe(401);
    expect(responseAuthentication.body.message).toBe("Incorrect email or password");
  });

  it("Should be able to authenticate", async () => {
    const responseAuthentication = await request(app).post("/api/v1/sessions").send({
      email: "financial@finapi.com",
      password: "financial",
    });

    expect(responseAuthentication.status).toBe(200);
    expect(responseAuthentication.body).toHaveProperty("token");
    expect(responseAuthentication.body).toHaveProperty("user");
  });

})
