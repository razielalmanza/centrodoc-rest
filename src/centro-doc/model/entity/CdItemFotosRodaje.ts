import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { CdItem } from "./CdItem";

@Index("fk_cd_item_fotos_rodaje_cd_item1_idx", ["idcdItem"], {})
@Entity("cd_item_fotos_rodaje", { schema: "documentacion" })
export class CdItemFotosRodaje {
  @Column("bigint", { primary: true, name: "idcd_item" })
  idcdItem: string;

  @Column("varchar", { name: "tama", nullable: true, length: 40 })
  tama: string | null;

  @Column("varchar", { name: "color", nullable: true, length: 50 })
  color: string | null;

  @OneToOne(() => CdItem, (cdItem) => cdItem.cdItemFotosRodaje, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "idcd_item", referencedColumnName: "idcdItem" }])
  idcdItem2: CdItem;
}
