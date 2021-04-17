import { getRepository, Repository } from "typeorm";

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "@modules/cars/repositories/ISpecificationsRepository";

import { Specification } from "../entities/Specification";

class SpecificationsRepository implements ISpecificationsRepository {
  // private specifications: Specification[];
  // private static INSTACE: SpecificationsRepository;

  // private constructor() {
  //   this.specifications = [];
  // }

  // public static getInstance() {
  //   if (!SpecificationsRepository.INSTACE) {
  //     SpecificationsRepository.INSTACE = new SpecificationsRepository();
  //   }
  //   return SpecificationsRepository.INSTACE;
  // }

  private repository: Repository<Specification>;

  // new - para criar novas instancias nao será mais possível. Somente a própria classe conseguirá chamar o construtor
  // remover private do constructor()
  constructor() {
    this.repository = getRepository(Specification);
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.findByIds(ids);
    return specifications;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name });

    return specification;
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    // const specification = new Specification();

    // Object.assign(specification, {
    //   name,
    //   description,
    //   created_at: new Date(),
    // });

    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);
  }
  async list(): Promise<Specification[]> {
    return this.repository.find();
  }
}
export { SpecificationsRepository };
