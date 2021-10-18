import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CdTransPersonasCatTitulos } from "./CdTransPersonasCatTitulos";

@Entity("cd_personas", { schema: "documentacion" })
export class CdPersonas {
  @PrimaryGeneratedColumn({ type: "bigint", name: "idcd_personas" })
  idcdPersonas: string;

  @Column("varchar", { name: "nombre", length: 350 })
  nombre: string;

  @Column("char", {
    name: "tipo_persona",
    comment: "{F=Fisica, M=Moral}",
    length: 1,
    default: () => "'F'",
  })
  tipoPersona: string;

  @OneToMany(
    () => CdTransPersonasCatTitulos,
    (cdTransPersonasCatTitulos) => cdTransPersonasCatTitulos.idcdPersonas2,
    { onDelete: "SET NULL" }
  )
  cdTransPersonasCatTitulos: CdTransPersonasCatTitulos[];
}
