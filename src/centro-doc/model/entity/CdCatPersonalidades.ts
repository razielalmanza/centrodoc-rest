import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CdItem } from "./CdItem";

@Index("idx_nombre_art", ["nombreArtistico"], {})
@Entity("cd_cat_personalidades", { schema: "documentacion" })
export class CdCatPersonalidades {
  @PrimaryGeneratedColumn({ type: "bigint", name: "idcd_cat_personalidades" })
  idcdCatPersonalidades: string;

  @Column("varchar", { name: "nombre_artistico", length: 100 })
  nombreArtistico: string;

  @Column("varchar", { name: "nombre_verdadero", nullable: true, length: 100 })
  nombreVerdadero: string | null;

  @Column("varchar", { name: "sobrenombre", nullable: true, length: 100 })
  sobrenombre: string | null;

  @Column("int", { name: "a_r_acervo_repetido", nullable: true })
  aRAcervoRepetido: number | null;

  @OneToMany(() => CdItem, (cdItem) => cdItem.idcdCatPersonalidades2)
  cdItems: CdItem[];
}
