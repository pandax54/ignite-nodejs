import { Specification } from "../entities/Specification";

// DTO -> criar um objeto responsavel pela transferencia de dados de uma camada pra outra
interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
  list(): Promise<Specification[]>;
}

export { ISpecificationsRepository, ICreateSpecificationDTO };
