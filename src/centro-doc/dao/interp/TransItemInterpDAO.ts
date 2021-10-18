import { getConnection, DeleteResult, UpdateResult } from "typeorm";
import ORMActions from "../InterfacesDAO";
import { CdTransItemInterpretes } from "../../model";

class TransItemInterpDAO implements ORMActions<CdTransItemInterpretes> {
  public insert(
    entity: CdTransItemInterpretes
  ): Promise<CdTransItemInterpretes> {
    return getConnection().getRepository(CdTransItemInterpretes).save(entity);
  }

  public delete(id: number): Promise<DeleteResult> {
    return getConnection().getRepository(CdTransItemInterpretes).delete(id);
  }

  public remove(entity: CdTransItemInterpretes): Promise<DeleteResult> {
    return getConnection().getRepository(CdTransItemInterpretes).delete(entity);
  }

  public update(user) {
    return getConnection().getRepository(CdTransItemInterpretes).save(user);
  }

  public getAll(): Promise<CdTransItemInterpretes[]> {
    return getConnection()
      .getRepository(CdTransItemInterpretes)
      .createQueryBuilder("CdTransItemInterpretes")
      .getMany();
  }

  public getById(id: number): Promise<CdTransItemInterpretes> {
    return null;
  }
}

const transItemInterpDAO: TransItemInterpDAO = new TransItemInterpDAO();

export default transItemInterpDAO;
