import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AuthUserGroups } from "./AuthUserGroups";

@Index("name", ["name"], { unique: true })
@Entity("auth_group", { schema: "documentacion" })
export class AuthGroup {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", unique: true, length: 80 })
  name: string;

  @OneToMany(() => AuthUserGroups, (authUserGroups) => authUserGroups.group)
  authUserGroups: AuthUserGroups[];
}
