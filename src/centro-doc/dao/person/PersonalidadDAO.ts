import { getConnection, DeleteResult, UpdateResult } from "typeorm";
import ORMActions from "../InterfacesDAO";
import { CdCatPersonalidades } from "../../model";

class PersonDAO implements ORMActions<CdCatPersonalidades> {
  tableName: string = "person";

  public insert(entity: CdCatPersonalidades): Promise<CdCatPersonalidades> {
    return getConnection().getRepository(CdCatPersonalidades).save(entity);
  }

  public restore(entity: CdCatPersonalidades): Promise<UpdateResult> {
    return getConnection().getRepository(CdCatPersonalidades).restore(entity);
  }

  public delete(id: number): Promise<DeleteResult> {
    return getConnection().getRepository(CdCatPersonalidades).delete(id);
  }

  public remove(entity: CdCatPersonalidades): Promise<DeleteResult> {
    return getConnection().getRepository(CdCatPersonalidades).delete(entity);
  }

  public update(user): Promise<CdCatPersonalidades> {
    return getConnection().getRepository(CdCatPersonalidades).save(user);
  }

  public getById(id: number): Promise<CdCatPersonalidades> {
    return getConnection()
      .getRepository(CdCatPersonalidades)
      .createQueryBuilder(this.tableName)
      .where(`${this.tableName}.idcd_cat_personalidades = :id`, { id: id })
      .leftJoinAndSelect(`${this.tableName}.cdItems`, "join")
      .getOne();
  }

  public getByQuery(query: string, page: any): Promise<any[]> {
    return getConnection()
      .getRepository(CdCatPersonalidades)
      .createQueryBuilder(this.tableName)
      .where(query)
      .take(page.take)
      .skip(page.skip)
      .getManyAndCount();
  }

  public getAll(): Promise<CdCatPersonalidades[]> {
    return getConnection()
      .getRepository(CdCatPersonalidades)
      .createQueryBuilder("CdCatPersonalidades")
      .getMany();
  }
}

const personDAO: PersonDAO = new PersonDAO();

export default personDAO;
