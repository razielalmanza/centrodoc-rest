import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CdItem } from "./CdItem";
import { CdTransPersonasCatTitulos } from "./CdTransPersonasCatTitulos";

@Entity("cd_cat_titulos", { schema: "documentacion" })
export class CdCatTitulos {
  @PrimaryGeneratedColumn({ type: "bigint", name: "idcd_cat_titulos" })
  idcdCatTitulos: string;

  @Column("varchar", { name: "titulo_original", length: 250 })
  tituloOriginal: string;

  @Column("varchar", { name: "titulo_en_espa", length: 250 })
  tituloEnEspa: string;

  @Column("smallint", { name: "anio", default: () => "'0'" })
  anio: number;

  @Column("smallint", {
    name: "anio_fin",
    nullable: true,
    comment: "Si es un rango de años",
  })
  anioFin: number | null;

  @Column("varchar", {
    name: "pais_de_realizacion",
    nullable: true,
    length: 70,
  })
  paisDeRealizacion: string | null;

  @Column("bit", {
    name: "circa",
    comment: "Si el año o rango de años es estimado",
    default: () => "'b'0''",
  })
  circa: boolean;

  @OneToMany(() => CdItem, (cdItem) => cdItem.idcdCatTitulos2)
  cdItems: CdItem[];

  @OneToMany(
    () => CdTransPersonasCatTitulos,
    (cdTransPersonasCatTitulos) => cdTransPersonasCatTitulos.idcdCatTitulos2,
    { onDelete: "SET NULL" }
  )
  cdTransPersonasCatTitulos: CdTransPersonasCatTitulos[];
}
