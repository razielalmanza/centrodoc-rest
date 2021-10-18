import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AuthUserGroups } from "./AuthUserGroups";

@Index("username_UNIQUE", ["username"], { unique: true })
@Entity("auth_user", { schema: "documentacion" })
export class AuthUser {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "password", length: 128 })
  password: string;

  @Column("datetime", { name: "last_login", nullable: true })
  lastLogin: Date | null;

  @Column("tinyint", { name: "is_superuser", default: () => "'0'" })
  isSuperuser: boolean;

  @Column("varchar", { name: "username", unique: true, length: 30 })
  username: string;

  @Column("varchar", { name: "first_name", nullable: true, length: 30 })
  firstName: string | null;

  @Column("varchar", { name: "last_name", nullable: true, length: 30 })
  lastName: string | null;

  @Column("varchar", { name: "email", length: 75 })
  email: string;

  @Column("tinyint", { name: "is_active", default: () => "'1'" })
  isActive: boolean;

  @Column("tinyint", { name: "is_staff", default: () => "'0'" })
  isStaff: boolean;

  @Column("datetime", {
    name: "date_joined",
    default: () => "CURRENT_TIMESTAMP",
  })
  dateJoined: Date;

  @OneToMany(() => AuthUserGroups, (authUserGroups) => authUserGroups.user)
  authUserGroups: AuthUserGroups[];
}
