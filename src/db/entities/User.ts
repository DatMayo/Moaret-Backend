import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DBBaseEntity } from "./DBBaseEntity";
import { DBCompany } from "./Company";

@Entity()
export class DBUser extends DBBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ select: false })
  password: string;

  @Column()
  mail: string;

  @Column({ default: true })
  active: boolean;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @OneToMany(() => DBCompany, (company) => company.owner)
  @JoinColumn()
  companies?: DBCompany[];
}
