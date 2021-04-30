import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindSpecificationUseCase } from "./FindSpecificationUseCase";

class FindSpecificationController {
  //   constructor(private findSpecificationUseCase: FindSpecificationUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const findSpecificationUseCase = container.resolve(
      FindSpecificationUseCase
    );
    const specification = await findSpecificationUseCase.execute(name);

    return response.status(200).json({ specification });
  }
}

export { FindSpecificationController };
