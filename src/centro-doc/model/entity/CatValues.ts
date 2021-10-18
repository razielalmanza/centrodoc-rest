import { Column, Entity } from "typeorm";

@Entity("cat_values", { schema: "documentacion" })
export class CatValues {
  @Column("varchar", { primary: true, name: "tname", length: 50 })
  tname: string;

  @Column("varchar", { primary: true, name: "fname", length: 50 })
  fname: string;

  @Column("varchar", { primary: true, name: "val", length: 80 })
  val: string;

  @Column("varchar", { name: "display_value", length: 80 })
  displayValue: string;
}
