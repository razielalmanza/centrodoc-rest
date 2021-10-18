import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { CdItem } from "./CdItem";

@Index("fk_cd_vhs_dvd_cd_item1_idx", ["idcdItem"], {})
@Entity("cd_vhs_dvd", { schema: "documentacion" })
export class CdVhsDvd {
  @Column("bigint", { primary: true, name: "idcd_item" })
  idcdItem: string;

  @Column("varchar", { name: "formato", nullable: true, length: 10 })
  formato: string | null;

  @Column("varchar", { name: "color", nullable: true, length: 100 })
  color: string | null;

  @Column("varchar", { name: "audio", nullable: true, length: 50 })
  audio: string | null;

  @Column("varchar", { name: "idioma", nullable: true, length: 100 })
  idioma: string | null;

  @Column("varchar", { name: "subtitulos", nullable: true, length: 200 })
  subtitulos: string | null;

  @Column("varchar", { name: "intertitulos", nullable: true, length: 50 })
  intertitulos: string | null;

  @Column("varchar", { name: "norma", nullable: true, length: 4 })
  norma: string | null;

  @Column("time", { name: "duracion", nullable: true })
  duracion: string | null;

  @Column("varchar", { name: "region", nullable: true, length: 16 })
  region: string | null;

  @Column("varchar", { name: "pantalla", nullable: true, length: 100 })
  pantalla: string | null;

  @Column("varchar", { name: "observaciones", nullable: true, length: 800 })
  observaciones: string | null;

  @Column("varchar", { name: "extras", nullable: true, length: 50 })
  extras: string | null;

  @OneToOne(() => CdItem, (cdItem) => cdItem.cdVhsDvd, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "idcd_item", referencedColumnName: "idcdItem" }])
  idcdItem2: CdItem;
}
