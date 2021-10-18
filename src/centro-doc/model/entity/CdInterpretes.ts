import { Column, Entity, OneToMany } from "typeorm";
import { CdTransItemInterpretes } from "./CdTransItemInterpretes";

@Entity("cd_interpretes", { schema: "documentacion" })
export class CdInterpretes {
  @Column("varchar", { primary: true, name: "nombre", length: 100 })
  nombre: string;

  @OneToMany(
    () => CdTransItemInterpretes,
    (cdTransItemInterpretes) => cdTransItemInterpretes.nombre2
  )
  cdTransItemInterpretes: CdTransItemInterpretes[];
}
