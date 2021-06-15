"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlterUserAddAvatar1617386294446 = void 0;

var _typeorm = require("typeorm");

class AlterUserAddAvatar1617386294446 {
  async up(queryRunner) {
    await queryRunner.addColumn("users", new _typeorm.TableColumn({
      name: "avatar",
      type: "varchar",
      isNullable: true
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropColumn("users", "avatar"); // tabela e coluna
  }

}

exports.AlterUserAddAvatar1617386294446 = AlterUserAddAvatar1617386294446;