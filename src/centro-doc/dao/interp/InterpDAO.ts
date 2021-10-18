import { getConnection, DeleteResult, UpdateResult } from "typeorm";
import ORMActions from "../InterfacesDAO";
import { CdInterpretes } from "../../model";

class InterpDAO implements ORMActions<CdInterpretes> {
  tableName: string = "interp";

  public insert(entity: CdInterpretes): Promise<CdInterpretes> {
    return getConnection().getRepository(CdInterpretes).save(entity);
  }

  public restore(entity: CdInterpretes): Promise<UpdateResult> {
    return getConnection().getRepository(CdInterpretes).restore(entity);
  }

  public delete(id: string): Promise<DeleteResult> {
    return getConnection().getRepository(CdInterpretes).delete(id);
  }

  public remove(entity: CdInterpretes): Promise<DeleteResult> {
    return getConnection().getRepository(CdInterpretes).delete(entity);
  }

  public update(user) {
    return getConnection().getRepository(CdInterpretes).save(user);
  }

  public getById(id: string): Promise<CdInterpretes> {
    return getConnection()
      .getRepository(CdInterpretes)
      .createQueryBuilder(this.tableName)
      .where(`${this.tableName}.nombre = :id`, { id: id })
      .leftJoinAndSelect(`${this.tableName}.cdTransItemInterpretes`, "join")
      .leftJoinAndSelect("join.idcdItem2", "join2")
      .getOne();
  }

  public getByQuery(query: string, page: any): Promise<any[]> {
    return getConnection()
      .getRepository(CdInterpretes)
      .createQueryBuilder(this.tableName)
      .where(query)
      .leftJoinAndSelect(`${this.tableName}.cdTransItemInterpretes`, "join")
      .leftJoinAndSelect("join.idcdItem2", "join2")
      .take(page.take)
      .skip(page.skip)
      .getManyAndCount();
  }

  public getAll(): Promise<CdInterpretes[]> {
    return getConnection()
      .getRepository(CdInterpretes)
      .createQueryBuilder("CdInterpretes")
      .getMany();
  }

  public getByPersonaId(idPersona: number): Promise<CdInterpretes[]> {
    return getConnection()
      .getRepository(CdInterpretes)
      .createQueryBuilder(this.tableName)
      .leftJoinAndSelect(`${this.tableName}.CdInterpretes`, "join")
      .leftJoinAndSelect("join.idcdPersonas2", "join2")
      .where("join2.idcd_personas = :id", { id: idPersona })
      .getMany();
  }

  public softRemove(entity: CdInterpretes): Promise<DeleteResult> {
    return getConnection().getRepository(CdInterpretes).softDelete(entity);
  }
}

const interpDAO: InterpDAO = new InterpDAO();

export default interpDAO;
