import { Router, Request, Response } from 'express'
import { createSpecificationController } from '../modules/cars/useCases/createSpecification';
import { findSpecificationController } from '../modules/cars/useCases/listSpecification';


const specficationRouter = Router();


specficationRouter.post("/", (request: Request, response: Response) => {
    createSpecificationController.handle(request, response)
})

specficationRouter.get("/", (request: Request, response: Response) => {
    findSpecificationController.handle(request, response)
})

export { specficationRouter }