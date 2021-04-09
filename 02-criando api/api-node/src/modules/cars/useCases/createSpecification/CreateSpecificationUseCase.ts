import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";



class CreateSpecificationUseCase {

    constructor(private specificationsRepository: ISpecificationsRepository){}
    
    execute(name: string, description: string){
        this.specificationsRepository.create({name, description})
    }
}


export {CreateSpecificationUseCase}