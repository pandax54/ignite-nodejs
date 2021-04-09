import { ISpecificationsRepository } from "../repositories/ISpecificationsRepository";



interface IRequest {
    name: string;
    description: string
}


class CreateSpecificationService {
    
    constructor(private specificationsRepository: ISpecificationsRepository){}
    
    execute({name, description}: IRequest): void {

        const specificationAlredyExists = this.specificationsRepository.findByName(name)
        if (specificationAlredyExists) {
            throw new Error("Specification already registered!")
        }
        
        this.specificationsRepository.create({
            name, 
            description
        })
    
    }
}

export {CreateSpecificationService};