import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { CdItem } from "./CdItem";

@Index("fk_cd_item_stills_cd_item1_idx", ["idcdItem"], {})
@Entity("cd_item_stills", { schema: "documentacion" })
export class CdItemStills {
  @Column("bigint", { primary: true, name: "idcd_item" })
  idcdItem: string;

  @Column("int", { name: "a_r_", nullable: true })
  aR: number | null;

  @Column("varchar", {
    name: "a_f_total_ejemplares",
    nullable: true,
    length: 50,
  })
  aFTotalEjemplares: string | null;

  @OneToOne(() => CdItem, (cdItem) => cdItem.cdItemStills, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "idcd_item", referencedColumnName: "idcdItem" }])
  idcdItem2: CdItem;
}
