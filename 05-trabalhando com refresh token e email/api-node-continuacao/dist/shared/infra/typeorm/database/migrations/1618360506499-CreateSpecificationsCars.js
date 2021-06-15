"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSpecificationsCars1618360506499 = void 0;

var _typeorm = require("typeorm");

class CreateSpecificationsCars1618360506499 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "specifications_cars",
      columns: [{
        name: "car_id",
        type: "uuid"
      }, {
        name: "specification_id",
        type: "uuid"
      }, {
        name: "created_at",
        type: "timestamp",
        default: "now()"
      }]
    })); // uma FK para referenciar cada tabela

    await queryRunner.createForeignKey("specifications_cars", new _typeorm.TableForeignKey({
      name: "FKSpecificationCar",
      referencedTableName: "specifications",
      referencedColumnNames: ["id"],
      columnNames: ["specification_id"],
      onDelete: "SET NULL",
      onUpdate: "SET NULL"
    }));
    await queryRunner.createForeignKey("specifications_cars", new _typeorm.TableForeignKey({
      name: "FKCarSpecification",
      referencedTableName: "cars",
      referencedColumnNames: ["id"],
      columnNames: ["car_id"],
      onDelete: "SET NULL",
      onUpdate: "SET NULL"
    }));
  }

  async down(queryRunner) {
    // processo inverso
    // nome da tabela, nome da foreignKey
    await queryRunner.dropForeignKey("specifications_cars", "FKSpecificationCar");
    await queryRunner.dropForeignKey("specifications_cars", "FKCarSpecification");
    await queryRunner.dropTable("specifications_cars");
  }

}

exports.CreateSpecificationsCars1618360506499 = CreateSpecificationsCars1618360506499;