import { getConnection, DeleteResult, UpdateResult } from "typeorm";
import ORMActions from "../InterfacesDAO";
import { CdItemDigital } from "../../model";

class ItemDigitalDAO implements ORMActions<CdItemDigital> {
  tableName: string = "itemDigital";

  public insert(entity: CdItemDigital): Promise<CdItemDigital> {
    return getConnection().getRepository(CdItemDigital).save(entity);
  }

  public restore(entity: CdItemDigital): Promise<UpdateResult> {
    return getConnection().getRepository(CdItemDigital).restore(entity);
  }

  public delete(id: number): Promise<DeleteResult> {
    return getConnection().getRepository(CdItemDigital).delete(id);
  }

  public remove(entity: CdItemDigital): Promise<DeleteResult> {
    return getConnection().getRepository(CdItemDigital).delete(entity);
  }

  public update(user) {
    return getConnection().getRepository(CdItemDigital).save(user);
  }

  public getById(id: number): Promise<CdItemDigital> {
    return (
      getConnection()
        .getRepository(CdItemDigital)
        .createQueryBuilder(this.tableName)
        .where(`${this.tableName}.idcd_item = :id`, { id: id })
        .leftJoinAndSelect(`${this.tableName}.idcdItem2`, "join")
        //.leftJoinAndSelect("join.idCdItemDigital2", "join2")
        .getOne()
    );
  }

  public getByQuery(query): Promise<CdItemDigital[]> {
    return null;
  }

  public getAll(): Promise<CdItemDigital[]> {
    return getConnection()
      .getRepository(CdItemDigital)
      .createQueryBuilder("CdItemDigital")
      .getMany();
  }
}

const itemDigitalDAO: ItemDigitalDAO = new ItemDigitalDAO();

export default itemDigitalDAO;
