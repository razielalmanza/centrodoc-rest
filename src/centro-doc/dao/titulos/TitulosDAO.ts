import { getConnection, DeleteResult } from "typeorm";
import ORMActions from "../InterfacesDAO";
import { CdCatTitulos, CdTransPersonasCatTitulos } from "../../model";

class TitulosDAO implements ORMActions<CdCatTitulos> {
  tableName: string = "titulo";
  public insert(entity: CdCatTitulos): Promise<CdCatTitulos> {
    return getConnection().getRepository(CdCatTitulos).save(entity);
  }

  public delete(id: number): Promise<DeleteResult> {
    return null;
  }

  public update(user) {
    return getConnection().getRepository(CdCatTitulos).save(user);
  }

  public getById(id: number): Promise<CdCatTitulos> {
    return getConnection()
      .getRepository(CdCatTitulos)
      .createQueryBuilder(this.tableName)
      .where(`${this.tableName}.idcd_cat_titulos = :id`, { id: id })
      .leftJoinAndSelect(`${this.tableName}.cdItems`, "join")
      .getOne();
  }

  public getByQuery(query: string, page: any): Promise<any[]> {
    return getConnection()
      .getRepository(CdCatTitulos)
      .createQueryBuilder(this.tableName)
      .where(query)
      .skip(page.skip)
      .take(page.take)
      .getManyAndCount();
  }

  public getAll(): Promise<CdCatTitulos[]> {
    return getConnection()
      .getRepository(CdCatTitulos)
      .createQueryBuilder("CdCatTitulos")
      .getMany();
  }

  public getByPersonaId(
    idPersona: number
  ): Promise<CdTransPersonasCatTitulos[]> {
    return (
      getConnection()
        .getRepository(CdTransPersonasCatTitulos)
        .createQueryBuilder("trans")
        .where(`trans.idcd_personas = :id`, { id: idPersona })
        .leftJoinAndSelect(`trans.idcdCatTitulos2`, "join")
        //.leftJoinAndSelect("join.idcdPersonas2", "join2")
        .getMany()
    );
  }
}

const titulosDAO: TitulosDAO = new TitulosDAO();

export default titulosDAO;
