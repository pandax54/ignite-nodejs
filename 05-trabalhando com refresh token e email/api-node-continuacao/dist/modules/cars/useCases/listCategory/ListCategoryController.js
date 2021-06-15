"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCategoryController = void 0;

var _tsyringe = require("tsyringe");

var _ListCategoryUseCase = require("./ListCategoryUseCase");

class ListCategoryController {
  // constructor(private listCategoryUseCase : ListCategoryUseCase) {}
  async handle(request, response) {
    const listCategoryUseCase = _tsyringe.container.resolve(_ListCategoryUseCase.ListCategoryUseCase);

    const categories = await listCategoryUseCase.execute();
    return response.status(200).json(categories);
  }

}

exports.ListCategoryController = ListCategoryController;