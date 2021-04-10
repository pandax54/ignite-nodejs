// import { v4 as uuid } from "uuid";

// class Specification {
//   id?: string;
//   name: string;
//   description: string;
//   created_at: Date;

//   constructor() {
//     // if it's a new object, create a new id
//     if (!this.id) {
//       this.id = uuid();
//     }
//   }
// }

// export { Specification };
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("specifications") // nome da tabela
class Specification {
  @PrimaryColumn()
  id?: string;

  @Column() // @Column("nome da coluna no banco")
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    // if it's a new object, create a new id
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Specification };
