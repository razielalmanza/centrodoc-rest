import { getConnection, DeleteResult } from "typeorm";
import ORMActions from "../InterfacesDAO";
import { CdPersonas } from "../../model";

class PersonaDAO implements ORMActions<CdPersonas> {
  tableName:string = "persona";
  public insert(entity: CdPersonas): Promise<CdPersonas> {
    return getConnection().getRepository(CdPersonas).save(entity);
  }

  public delete(id: number): Promise<DeleteResult> {
    return null;
  }

  public update(user) {
    return getConnection().getRepository(CdPersonas).save(user);
  }

  public getById(id: number): Promise<CdPersonas> {
    return getConnection()
      .getRepository(CdPersonas)
      .createQueryBuilder(this.tableName)
      .where(`${this.tableName}.idcd_personas = :id`, { id: id })
      //.leftJoinAndSelect(`${this.tableName}.cdTransPersonasCatTitulos`, "join")
      //.leftJoinAndSelect("join.idcdCatTitulos2", "join2")
      .getOne();
  }
  public getByNombre(nombre: string): Promise<CdPersonas> {
    return getConnection()
      .getRepository(CdPersonas)
      .createQueryBuilder(this.tableName)
      .where(`${this.tableName}.nombre = :id`, { id: nombre })
      .getOne();
  }

  public getByQuery(query: string, page: any): Promise<any[]> {
    return getConnection()
      .getRepository(CdPersonas)
      .createQueryBuilder(this.tableName)
      .where(query)
      .take(page.take)
      .skip(page.skip)
      .getManyAndCount();
  }

  public getAll(): Promise<CdPersonas[]> {
    return getConnection()
      .getRepository(CdPersonas)
      .createQueryBuilder("CdPersonas")
      .getMany();
  }

  public getByTituloId(idTitulo: number): Promise<CdPersonas[]> {
    return getConnection()
      .getRepository(CdPersonas)
      .createQueryBuilder(this.tableName)
      .leftJoinAndSelect(`${this.tableName}.cdTransPersonasCatTitulos`, "join")
      .leftJoinAndSelect("join.idcdCatTitulos2", "join2")
      .where("join2.idcd_cat_titulos = :id", { id: idTitulo })
      .getMany();
  }
}

const personasDAO: PersonaDAO = new PersonaDAO();

export default personasDAO;
