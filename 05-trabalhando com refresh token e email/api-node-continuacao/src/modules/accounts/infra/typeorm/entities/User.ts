import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Expose } from "class-transformer";
@Entity("users")
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  // @Column()
  // username: string;

  @Column()
  avatar: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  driver_license: string;

  @Column()
  is_admin: boolean;

  @Expose({ name: "avatar_url" }) // nome da coluna no json
  avatar_url(): string {
    // returnar a url de acesso para o avatar
    switch (process.env.disk) {
      case "local":
        return `${process.env.APP_API_URL}/avatar/${this.avatar}`;
        break;
      case "s3":
        return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`;
        break;
      default:
        return null;
    }
  }

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    // if it's a new object, create a new id
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User };
