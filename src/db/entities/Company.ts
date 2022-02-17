import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DBBaseEntity } from "./DBBaseEntity";
import { DBUser } from "./User";

@Entity()
export class DBCompany extends DBBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => DBUser, (user) => user.companies, { onDelete: "SET NULL" })
  @JoinColumn()
  owner: DBUser;
}
