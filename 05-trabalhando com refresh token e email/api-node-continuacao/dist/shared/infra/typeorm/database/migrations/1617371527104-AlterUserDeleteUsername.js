"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlterUserDeleteUsername1617371527104 = void 0;

var _typeorm = require("typeorm");

class AlterUserDeleteUsername1617371527104 {
  async up(queryRunner) {
    await queryRunner.dropColumn("users", "username"); // tabela e coluna
  }

  async down(queryRunner) {
    await queryRunner.addColumn("users", new _typeorm.TableColumn({
      name: "username",
      type: "varchar",
      isUnique: true
    }));
  }

}

exports.AlterUserDeleteUsername1617371527104 = AlterUserDeleteUsername1617371527104;