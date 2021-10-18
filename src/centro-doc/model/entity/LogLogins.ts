import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("log_logins", { schema: "documentacion" })
export class LogLogins {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("datetime", { name: "time", default: () => "CURRENT_TIMESTAMP" })
  time: Date;

  @Column("varchar", { name: "user", length: 30 })
  user: string;

  @Column("varchar", { name: "ip", length: 30, nullable: true })
  ip: string | null;
}
