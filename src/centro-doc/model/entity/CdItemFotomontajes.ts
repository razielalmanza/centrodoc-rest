import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { CdItem } from "./CdItem";

@Index("fk_cd_item_fotomontajes_cd_item1_idx", ["idcdItem"], {})
@Entity("cd_item_fotomontajes", { schema: "documentacion" })
export class CdItemFotomontajes {
  @Column("bigint", { primary: true, name: "idcd_item" })
  idcdItem: string;

  @Column("varchar", { name: "ejemplares", nullable: true, length: 100 })
  ejemplares: string | null;

  @Column("varchar", { name: "pais", nullable: true, length: 70 })
  pais: string | null;

  @OneToOne(() => CdItem, (cdItem) => cdItem.cdItemFotomontajes, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "idcd_item", referencedColumnName: "idcdItem" }])
  idcdItem2: CdItem;
}
