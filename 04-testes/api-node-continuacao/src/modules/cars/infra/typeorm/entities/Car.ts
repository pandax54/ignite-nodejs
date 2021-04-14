import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { Category } from "./Category";
import { Specification } from "./Specification";

@Entity("cars") // nome da tabela
class Car {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  daily_rate: number;

  @Column()
  available: boolean;

  @Column()
  license_plate: string;

  @Column()
  fine_amount: number;

  @Column()
  brand: string;

  // chave estrangeira - Many to one (muitos carros para uma categoria)
  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @Column()
  category_id: string;

  // relação com a tabela specifications
  @ManyToMany(() => Specification) // qual a tabela que está sendo relacionada
  @JoinTable({
    name: "specifications_cars", // nome da tabela de relacionamentos
    joinColumns: [{ name: "car_id" }], // coluna dentro da tabela specifications_cars que pertence a essa tabela(cars)
    inverseJoinColumns: [{ name: "specification_id" }],
  })
  specifications: Specification[];

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    // if it's a new object, create a new id
    if (!this.id) {
      this.id = uuid();
      this.available = true;
      // this.created_at = new Date();
    }
  }
}

export { Car };
