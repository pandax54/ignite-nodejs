"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindSpecificationController = void 0;

var _tsyringe = require("tsyringe");

var _FindSpecificationUseCase = require("./FindSpecificationUseCase");

class FindSpecificationController {
  //   constructor(private findSpecificationUseCase: FindSpecificationUseCase) {}
  async handle(request, response) {
    const {
      name
    } = request.body;

    const findSpecificationUseCase = _tsyringe.container.resolve(_FindSpecificationUseCase.FindSpecificationUseCase);

    const specification = await findSpecificationUseCase.execute(name);
    return response.status(200).json({
      specification
    });
  }

}

exports.FindSpecificationController = FindSpecificationController;