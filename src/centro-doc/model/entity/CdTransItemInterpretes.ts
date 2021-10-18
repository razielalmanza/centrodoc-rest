import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { CdInterpretes } from "./CdInterpretes";
import { CdItem } from "./CdItem";

@Index("fk_cd_item_has_cd_interpretes_cd_interpretes1_idx", ["nombre"], {})
@Index("fk_cd_item_has_cd_interpretes_cd_item1_idx", ["idcdItem"], {})
@Entity("cd_trans_item_interpretes", { schema: "documentacion" })
export class CdTransItemInterpretes {
  @Column("bigint", { primary: true, name: "idcd_item" })
  idcdItem: string;

  @Column("varchar", { primary: true, name: "nombre", length: 100 })
  nombre: string;

  @Column("varchar", { name: "xy_start", nullable: true, length: 20 })
  xyStart: string | null;

  @Column("varchar", { name: "xy_end", nullable: true, length: 20 })
  xyEnd: string | null;

  @ManyToOne(
    () => CdInterpretes,
    (cdInterpretes) => cdInterpretes.cdTransItemInterpretes,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "nombre", referencedColumnName: "nombre" }])
  nombre2: CdInterpretes;

  @ManyToOne(() => CdItem, (cdItem) => cdItem.cdTransItemInterpretes, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "idcd_item", referencedColumnName: "idcdItem" }])
  idcdItem2: CdItem;
}
