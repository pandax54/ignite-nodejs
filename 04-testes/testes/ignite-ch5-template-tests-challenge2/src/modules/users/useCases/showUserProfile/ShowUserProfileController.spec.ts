import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { app } from "../../../../app";

import createConnection from "../../../../database";


let connection: Connection;

describe("Show User Profile Controller", () => {
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

  it("Should be able to show self-profile", async () => {
    const authResponse = await request(app).post("/api/v1/sessions").send({
      email: 'financial@finapi.com',
      password: 'financial'
    });
    const { token } = authResponse.body;

    const responseShowUserProfile = await request(app).get("/api/v1/profile").send().set({
      Authorization: `Bearer ${token}`
    });



    expect(responseShowUserProfile.status).toBe(200);
  });
})
