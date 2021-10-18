import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { CdItem } from "./CdItem";

@Index("fk_cd_item_cartel_cd_item1_idx", ["idcdItem"], {})
@Entity("cd_item_cartel", { schema: "documentacion" })
export class CdItemCartel {
  @Column("bigint", { primary: true, name: "idcd_item" })
  idcdItem: string;

  @Column("varchar", { name: "institucion", nullable: true, length: 500 })
  institucion: string | null;

  @Column("varchar", { name: "pais", nullable: true, length: 62 })
  pais: string | null;

  @Column("varchar", { name: "tama", nullable: true, length: 37 })
  tama: string | null;

  @Column("varchar", { name: "ejemplares", nullable: true, length: 62 })
  ejemplares: string | null;

  @Column("varchar", { name: "diseniador", nullable: true, length: 112 })
  diseniador: string | null;

  @Column("varchar", { name: "tecnica", nullable: true, length: 250 })
  tecnica: string | null;

  @Column("varchar", { name: "estado_fisico", nullable: true, length: 25 })
  estadoFisico: string | null;

  @Column("varchar", { name: "car_consulta", length: 45 })
  carConsulta: string;

  @OneToOne(() => CdItem, (cdItem) => cdItem.cdItemCartel, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "idcd_item", referencedColumnName: "idcdItem" }])
  idcdItem2: CdItem;
}
