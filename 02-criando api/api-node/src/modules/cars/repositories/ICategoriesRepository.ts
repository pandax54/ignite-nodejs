import { Category } from "../model/Category";

// DTO -> criar um objeto responsavel pela transferencia de dados de uma camada pra outra
interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ICategoriesRepository {
    findByName(name: string): Category;
    list(): Category[];
    create({name, description}: ICreateCategoryDTO): void;
}

export {ICategoriesRepository, ICreateCategoryDTO};