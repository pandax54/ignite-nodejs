import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { app } from "../../../../app";

import createConnection from "../../../../database";


let connection: Connection;
let statement_id: string;

describe("Get Balance Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();

    const user_id = uuidv4();
    statement_id = uuidv4();
    const password = await hash("financial", 8);

    await connection.query(
      `INSERT INTO users(id, name, email, password, created_at, updated_at)
       VALUES('${user_id}', 'financial', 'financial@finapi.com', '${password}', 'now()', 'now()')
      `
      );

      await connection.query(
        `INSERT INTO statements(id,user_id, description, amount, type, created_at, updated_at)
         VALUES('${statement_id}', '${user_id}', 'deposit', 200.00,'deposit', 'now()', 'now()')
        `
        );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to return user balance", async () => {
    const authResponse = await request(app).post("/api/v1/sessions").send({
      email: 'financial@finapi.com',
      password: 'financial'
    });
    const { token } = authResponse.body;


    const responseGetBalance = await request(app).get(`/api/v1/statements/balance`).send().set({
      Authorization: `Bearer ${token}`
    });

    expect(responseGetBalance.status).toBe(200);
    expect(responseGetBalance.body.balance).toBe(200);
    expect(responseGetBalance.body.statement.length).toBe(1);
  })
})
