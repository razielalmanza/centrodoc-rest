import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AuthUser } from "./AuthUser";
import { AuthGroup } from "./AuthGroup";

@Index("FK_0d50f1df9b57c3acd59e399181e_idx", ["userId"], {})
@Index("FK_c42e8bf67c840eae52387ccbd8b_idx", ["groupId"], {})
@Entity("auth_user_groups", { schema: "documentacion" })
export class AuthUserGroups {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("int", { name: "group_id" })
  groupId: number;

  @ManyToOne(() => AuthUser, (authUser) => authUser.authUserGroups, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: AuthUser;

  @ManyToOne(() => AuthGroup, (authGroup) => authGroup.authUserGroups, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "group_id", referencedColumnName: "id" }])
  group: AuthGroup;
}
