import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { DBBaseEntity } from "./DBBaseEntity";

@Entity()
export class DBUser extends DBBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  mail: string;
}
