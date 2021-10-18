import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CdItemDigital } from "./CdItemDigital";
import { CdItemCartel } from "./CdItemCartel";
import { CdCatTitulos } from "./CdCatTitulos";
import { CdCatPersonalidades } from "./CdCatPersonalidades";
import { CdItemFotomontajes } from "./CdItemFotomontajes";
import { CdItemFotosRodaje } from "./CdItemFotosRodaje";
import { CdTransItemInterpretes } from "./CdTransItemInterpretes";
import { CdItemStills } from "./CdItemStills";
import { CdVhsDvd } from "./CdVhsDvd";

@Index("fk_cd_item_cd_cat_titulos1_idx", ["idcdCatTitulos"], {})
@Index("fk_cd_item_cd_item_personalidades1_idx", ["idcdCatPersonalidades"], {})
@Entity("cd_item", { schema: "documentacion" })
export class CdItem {
  @PrimaryGeneratedColumn({ type: "bigint", name: "idcd_item" })
  idcdItem: string;

  @Column("bigint", { name: "idcd_cat_titulos", nullable: true })
  idcdCatTitulos: string | null;

  @Column("bigint", { name: "idcd_cat_personalidades", nullable: true })
  idcdCatPersonalidades: string | null;

  @Column("datetime", {
    name: "fechaHoraInsercion",
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaHoraInsercion: Date;

  @Column("varchar", {
    name: "tipo_item",
    comment:
      "Se obtiene de cat_values {cartel, fotomontaje, personalidad, still, fotografía de rodaje, video}",
    length: 45,
  })
  tipoItem: string;

  @Column("varchar", { name: "imagen_digital", nullable: true, length: 50 })
  imagenDigital: string | null;

  @Column("varchar", { name: "campos_comunes", nullable: true, length: 45 })
  camposComunes: string | null;

  @Column("varchar", {
    name: "foto_old_interpretes",
    nullable: true,
    length: 500,
  })
  fotoOldInterpretes: string | null;

  @Column("tinyint", { name: "activo", width: 1, default: () => "'1'" })
  activo: boolean;

  @Column("varchar", { name: "colocacion", nullable: true, length: 100 })
  colocacion: string | null;

  @Column("varchar", { name: "notas", nullable: true, length: 350 })
  notas: string | null;

  @OneToOne(() => CdItemDigital, (cdItemDigital) => cdItemDigital.idcdItem2)
  cdItemDigital: CdItemDigital;

  @OneToOne(() => CdItemCartel, (cdItemCartel) => cdItemCartel.idcdItem2)
  cdItemCartel: CdItemCartel;

  @ManyToOne(() => CdCatTitulos, (cdCatTitulos) => cdCatTitulos.cdItems, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([
    { name: "idcd_cat_titulos", referencedColumnName: "idcdCatTitulos" },
  ])
  idcdCatTitulos2: CdCatTitulos;

  @ManyToOne(
    () => CdCatPersonalidades,
    (cdCatPersonalidades) => cdCatPersonalidades.cdItems,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([
    {
      name: "idcd_cat_personalidades",
      referencedColumnName: "idcdCatPersonalidades",
    },
  ])
  idcdCatPersonalidades2: CdCatPersonalidades;

  @OneToOne(
    () => CdItemFotomontajes,
    (cdItemFotomontajes) => cdItemFotomontajes.idcdItem2
  )
  cdItemFotomontajes: CdItemFotomontajes;

  @OneToOne(
    () => CdItemFotosRodaje,
    (cdItemFotosRodaje) => cdItemFotosRodaje.idcdItem2
  )
  cdItemFotosRodaje: CdItemFotosRodaje;

  @OneToMany(
    () => CdTransItemInterpretes,
    (cdTransItemInterpretes) => cdTransItemInterpretes.idcdItem2
  )
  cdTransItemInterpretes: CdTransItemInterpretes[];

  @OneToOne(() => CdItemStills, (cdItemStills) => cdItemStills.idcdItem2)
  cdItemStills: CdItemStills;

  @OneToOne(() => CdVhsDvd, (cdVhsDvd) => cdVhsDvd.idcdItem2)
  cdVhsDvd: CdVhsDvd;
}
