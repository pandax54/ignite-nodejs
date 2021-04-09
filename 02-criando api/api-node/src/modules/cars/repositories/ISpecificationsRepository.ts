import { Specification } from "../model/Specification";


// DTO -> criar um objeto responsavel pela transferencia de dados de uma camada pra outra
interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    create({name, description}: ICreateSpecificationDTO): void;
    findByName(name: string): Specification;
}

export {ISpecificationsRepository, ICreateSpecificationDTO};