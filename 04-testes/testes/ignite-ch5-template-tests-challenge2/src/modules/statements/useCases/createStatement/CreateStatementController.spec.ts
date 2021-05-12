import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { app } from "../../../../app";

import createConnection from "../../../../database";


let connection: Connection;

describe("CreateStatement Operation Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();

    const user_id = uuidv4();
    const statement_id = uuidv4();
    const password = await hash("financial", 8);

    await connection.query(
      `INSERT INTO users(id, name, email, password, created_at, updated_at)
       VALUES('${user_id}', 'financial', 'financial@finapi.com', '${password}', 'now()', 'now()')
      `
      );

      await connection.query(
        `INSERT INTO statements(id,user_id, description, amount, type, created_at, updated_at)
         VALUES('${statement_id}', '${user_id}', 'deposit', 300.00,'deposit', 'now()', 'now()')
        `
        );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should not be able to create withdraw statement without balance", async () => {
    const authResponse = await request(app).post("/api/v1/sessions").send({
      email: 'financial@finapi.com',
      password: 'financial'
    });
    const { token } = authResponse.body;

    const responseCreateWithdrawStatement = await request(app).post(`/api/v1/statements/withdraw`)
      .send({
        amount: 400.00,
        description: "Withdraw ATM"
      })
      .set({
      Authorization: `Bearer ${token}`
    });

    expect(responseCreateWithdrawStatement.status).toBe(400);
    expect(responseCreateWithdrawStatement.body.message).toBe("Insufficient funds");
  });


  it("Should be able to create withdraw statement", async () => {
    const authResponse = await request(app).post("/api/v1/sessions").send({
      email: 'financial@finapi.com',
      password: 'financial'
    });
    const { token } = authResponse.body;

    const responseCreateWithdrawStatement = await request(app).post(`/api/v1/statements/withdraw`)
      .send({
        amount: 200.00,
        description: "Withdraw ATM"
      })
      .set({
      Authorization: `Bearer ${token}`
    });

    expect(responseCreateWithdrawStatement.status).toBe(201);
    expect(responseCreateWithdrawStatement.body).toHaveProperty("id");
    expect(responseCreateWithdrawStatement.body.type).toBe("withdraw");
  });

  it("Should be able to create deposit statement", async () => {
    const authResponse = await request(app).post("/api/v1/sessions").send({
      email: 'financial@finapi.com',
      password: 'financial'
    });
    const { token } = authResponse.body;

    const responseCreateWithdrawStatement = await request(app).post(`/api/v1/statements/deposit`)
      .send({
        amount: 200.00,
        description: "Withdraw ATM"
      })
      .set({
      Authorization: `Bearer ${token}`
    });

    expect(responseCreateWithdrawStatement.status).toBe(201);
    expect(responseCreateWithdrawStatement.body).toHaveProperty("id");
    expect(responseCreateWithdrawStatement.body.type).toBe("deposit");
  });
})
