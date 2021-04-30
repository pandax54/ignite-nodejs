import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { FindSpecificationController } from "./FindSpecificationController";
import { FindSpecificationUseCase } from './FindSpecificationUseCase'

const specificationsRepository = SpecificationsRepository.getInstance()

const findSpecificationUseCase =  new FindSpecificationUseCase(specificationsRepository)
const findSpecificationController =  new FindSpecificationController(findSpecificationUseCase)


export { findSpecificationController }