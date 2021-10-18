import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  OneToOne,
} from "typeorm";
import { CdItem } from "./CdItem";
import { CdContenedores } from "./CdContenedores";

@Index("fk_cd_imagen_digital_cd_item1_idx", ["idcdItem"], {})
@Entity("cd_item_digital", { schema: "documentacion" })
export class CdItemDigital {
  @Column("bigint", { primary: true, name: "idcd_item" })
  idcdItem: string;

  @Column("varchar", {
    name: "extension",
    comment: "Usa cat_values {TIFF, JPEG, PNG, ...}",
    length: 10,
  })
  extension: string;

  @Column("varchar", {
    name: "resolucion",
    comment: "Usa cat_values",
    length: 20,
  })
  resolucion: string;

  @Column("int", { name: "dpi", nullable: true })
  dpi: number | null;

  @Column("varchar", {
    name: "espacio_color",
    nullable: true,
    comment: "Usa cat_values",
    length: 20,
  })
  espacioColor: string | null;

  @Column("smallint", { name: "profundidad_bits", nullable: true })
  profundidadBits: number | null;

  @Column("varchar", { name: "nombre_archivo", length: 100 })
  nombreArchivo: string;

  @Column("varchar", { name: "nombre_proxy", length: 100 })
  nombreProxy: string;

  @OneToOne(() => CdItem, (cdItem) => cdItem.cdItemDigital, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "idcd_item", referencedColumnName: "idcdItem" }])
  idcdItem2: CdItem;

  @ManyToMany(
    () => CdContenedores,
    (cdContenedores) => cdContenedores.cdItemDigitals
  )
  cdContenedores: CdContenedores[];
}
