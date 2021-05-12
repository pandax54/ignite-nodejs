import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { app } from "../../../../app";

import createConnection from "../../../../database";


let connection: Connection;
let statement_id: string;

describe("Get Statement Operation Controller", () => {
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

  it("Should not be able to get a statement operation with non-existed statement", async () => {
    const authResponse = await request(app).post("/api/v1/sessions").send({
      email: 'financial@finapi.com',
      password: 'financial'
    });
    const { token } = authResponse.body;

    const wrongStatementId = '3ff61fe5-dbce-4cea-8856-68d25c427961';

    const responseGetStatementOperation = await request(app).get(`/api/v1/statements/${wrongStatementId}`).send().set({
      Authorization: `Bearer ${token}`
    });

    expect(responseGetStatementOperation.status).toBe(404);
    expect(responseGetStatementOperation.body.message).toBe("Statement not found");
  })


  it("Should be able to get a statement operation", async () => {
    const authResponse = await request(app).post("/api/v1/sessions").send({
      email: 'financial@finapi.com',
      password: 'financial'
    });
    const { token } = authResponse.body;

    const responseGetStatementOperation = await request(app).get(`/api/v1/statements/${statement_id}`).send().set({
      Authorization: `Bearer ${token}`
    });

    expect(responseGetStatementOperation.status).toBe(200);
    expect(responseGetStatementOperation.body).toHaveProperty("id");
    expect(responseGetStatementOperation.body.type).toBe("deposit");
  });
})
