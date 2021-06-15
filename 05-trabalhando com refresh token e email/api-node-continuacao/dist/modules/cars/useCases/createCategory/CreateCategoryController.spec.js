"use strict";

var _bcryptjs = require("bcryptjs");

var _supertest = _interopRequireDefault(require("supertest"));

var _uuid = require("uuid");

var _app = require("../../../../shared/infra/http/app");

var _database = _interopRequireDefault(require("../../../../shared/infra/typeorm/database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let connection;
describe("Create Category controller", () => {
  beforeAll(async () => {
    connection = await (0, _database.default)();
    await connection.runMigrations(); // criar um usuário administrador

    const id = (0, _uuid.v4)();
    const password = await (0, _bcryptjs.hash)("admin", 8);
    await connection.query(`INSERT INTO USERS(id, name, email, password, is_admin, driver_license)
          VALUES ('${id}', 'admin', 'admin@email.com', '${password}', true, '9999999')`);
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it("should be able to create a new category", async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post("/sessions").send({
      email: "admin@email.com",
      password: "admin"
    }); // alteramos para refresh_token (anteriorment token)

    const {
      refresh_token
    } = responseToken.body;
    const response = await (0, _supertest.default)(_app.app).post("/categories").send({
      name: "Test category",
      description: "Test description"
    }).set({
      Authorization: `Bearer ${refresh_token}`
    });
    expect(response.status).toBe(201);
  });
  it("should not be able to create a category that already exists", async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin"
    });
    const {
      refresh_token
    } = responseToken.body;
    const response = await (0, _supertest.default)(_app.app).post("/categories").send({
      name: "Test category",
      description: "Test description"
    }).set({
      Authorization: `Bearer ${refresh_token}`
    });
    expect(response.status).toBe(401);
  });
});