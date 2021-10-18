import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("log_actions", { schema: "documentacion" })
export class LogActions {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("datetime", { name: "time", default: () => "CURRENT_TIMESTAMP" })
  time: Date;

  @Column("varchar", { name: "user", length: 30 })
  user: string;

  @Column("varchar", { name: "action", length: 45 })
  action: string;

  @Column("varchar", { name: "id_affected", length: 10, nullable: true })
  idAffected: string | null;

  @Column("varchar", { name: "tabla", length: 30 })
  tabla: string;

  @Column("varchar", { name: "notas", length: 200, nullable: true })
  notas: string | null;
}
