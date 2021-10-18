import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { CdCatTitulos } from "./CdCatTitulos";
import { CdPersonas } from "./CdPersonas";

@Index(
  "fk_cd_personas_has_cd_cat_titulos_cd_cat_titulos1_idx",
  ["idcdCatTitulos"],
  {}
)
@Index(
  "fk_cd_personas_has_cd_cat_titulos_cd_personas_idx",
  ["idcdPersonas"],
  {}
)
@Entity("cd_trans_personas_cat_titulos", { schema: "documentacion" })
export class CdTransPersonasCatTitulos {
  @Column("bigint", { primary: true, name: "idcd_cat_titulos" })
  idcdCatTitulos: string;

  @Column("bigint", { primary: true, name: "idcd_personas" })
  idcdPersonas: string;

  @Column("varchar", {
    primary: true,
    name: "rol",
    comment:
      "Usa cat_values {Realizador, Productor, Guionista, Fotógrafo, ...} ",
    length: 80,
  })
  rol: string;

  @ManyToOne(
    () => CdCatTitulos,
    (cdCatTitulos) => cdCatTitulos.cdTransPersonasCatTitulos,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([
    { name: "idcd_cat_titulos", referencedColumnName: "idcdCatTitulos" },
  ])
  idcdCatTitulos2: CdCatTitulos;

  @ManyToOne(
    () => CdPersonas,
    (cdPersonas) => cdPersonas.cdTransPersonasCatTitulos,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "idcd_personas", referencedColumnName: "idcdPersonas" }])
  idcdPersonas2: CdPersonas;
}
