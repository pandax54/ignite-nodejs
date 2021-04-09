import { FindSpecificationUseCase } from "./FindSpecificationUseCase";
import { Request, Response } from 'express'

class FindSpecificationController {
    constructor(private findSpecificationUseCase: FindSpecificationUseCase) {}

    handle(request: Request, response: Response): Response {
        const { name } = request.body

        const specification = this.findSpecificationUseCase.execute(name)

        return response.status(200).json(specification)
    }

}

export {FindSpecificationController}