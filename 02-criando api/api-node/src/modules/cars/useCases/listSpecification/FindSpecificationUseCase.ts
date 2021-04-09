import { Specification } from '../../model/Specification'
import {ISpecificationsRepository} from '../../repositories/ISpecificationsRepository'


class FindSpecificationUseCase {
    constructor(private specificationsRepository: ISpecificationsRepository){}

    execute(name: string): Specification {
        return this.specificationsRepository.findByName(name)
    }
}

export {FindSpecificationUseCase}