import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { CdItemDigital } from "./CdItemDigital";

@Entity("cd_contenedores", { schema: "documentacion" })
export class CdContenedores {
  @Column("varchar", { primary: true, name: "id_contenedor", length: 13 })
  idContenedor: string;

  @Column("varchar", { name: "id_hex_lto", length: 13 })
  idHexLto: string;

  @ManyToMany(
    () => CdItemDigital,
    (cdItemDigital) => cdItemDigital.cdContenedores
  )
  @JoinTable({
    name: "cd_trans_item_digital_contenedores",
    joinColumns: [
      { name: "id_contenedor", referencedColumnName: "idContenedor" },
    ],
    inverseJoinColumns: [
      { name: "idcd_item", referencedColumnName: "idcdItem" },
    ],
    schema: "documentacion",
  })
  cdItemDigitals: CdItemDigital[];
}
