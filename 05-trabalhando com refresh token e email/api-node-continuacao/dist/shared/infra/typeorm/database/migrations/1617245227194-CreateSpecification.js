"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSpecification1617245227194 = void 0;

var _typeorm = require("typeorm");

class CreateSpecification1617245227194 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "specifications",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true
      }, {
        name: "name",
        type: "varchar"
      }, {
        name: "description",
        type: "varchar"
      }, {
        name: "created_at",
        type: "timestamp",
        default: "now()"
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable("specifications");
  }

}

exports.CreateSpecification1617245227194 = CreateSpecification1617245227194;