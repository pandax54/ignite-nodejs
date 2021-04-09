import { Router, Request, Response } from 'express'
import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { listCategoryController } from '../modules/cars/useCases/listCategory';
import multer from 'multer'
import { importCategoryController } from '../modules/cars/useCases/importCategory';

// precisamos instanciar o multer para utiliza-lo como middleware
var upload = multer({ dest: './tmp' })


const categoriesRouter = Router();

categoriesRouter.post("/", (request: Request, response: Response) => {
    return createCategoryController.handle(request, response)
})

categoriesRouter.get("/", (request: Request, response: Response) => {
    return listCategoryController.handle(request, response)
})

categoriesRouter.post("/import", upload.single('file'),(request: Request, response: Response) => {
    return importCategoryController.handle(request, response)
})

export { categoriesRouter }