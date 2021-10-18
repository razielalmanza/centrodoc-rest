import { getConnection, DeleteResult, UpdateResult, InsertResult } from "typeorm";
import ORMActions from "../InterfacesDAO";
import { CdTransPersonasCatTitulos } from "../../model";

class TransPersonasTituloDAO implements ORMActions<CdTransPersonasCatTitulos> {
  public insert(
    entity: CdTransPersonasCatTitulos
  ): Promise<CdTransPersonasCatTitulos> {
    return getConnection()
      .getRepository(CdTransPersonasCatTitulos)
      .save(entity);
  }
  public insertByIds(personaId:string, tituloId: string, rol:string): Promise<InsertResult>{
    return getConnection()
    .createQueryBuilder()
    .insert()
    .into(CdTransPersonasCatTitulos)
    .values(
      {idcdCatTitulos: tituloId, idcdPersonas: personaId, rol: rol}
    )
    .execute();
  }

  public restore(
    entity: CdTransPersonasCatTitulos
  ): Promise<UpdateResult> {
    return getConnection()
      .getRepository(CdTransPersonasCatTitulos)
      .restore(entity);
  }

  public delete(id: number): Promise<DeleteResult> {
    return getConnection()
      .getRepository(CdTransPersonasCatTitulos)
      .delete(id);
  }

  public remove(entity: CdTransPersonasCatTitulos): Promise<DeleteResult> {
    return getConnection()
      .getRepository(CdTransPersonasCatTitulos)
      .delete(entity);
  }

  public update(user) {
    return getConnection().getRepository(CdTransPersonasCatTitulos).save(user);
  }

  public getById(id: number): Promise<CdTransPersonasCatTitulos> {
    return getConnection()
      .getRepository(CdTransPersonasCatTitulos)
      .createQueryBuilder("titulo")
      .where("titulo.idcd_cat_titulos = :id", { id: id })
      .getOne();
  }

  public getByQuery(query): Promise<CdTransPersonasCatTitulos[]> {
    return getConnection()
      .getRepository(CdTransPersonasCatTitulos)
      .createQueryBuilder("titulo")
      .where(query)
      .getMany();
  }

  public getAll(): Promise<CdTransPersonasCatTitulos[]> {
    return getConnection()
      .getRepository(CdTransPersonasCatTitulos)
      .createQueryBuilder("CdTransPersonasCatTitulos")
      .getMany();
  }

  public getRolesByRelation(idPersona: number, idTitulo: number): Promise<any>{
    return getConnection()
    .getRepository(CdTransPersonasCatTitulos)
    .createQueryBuilder("trans")
    .select()
    .where("trans.idcd_personas = :idP and trans.idcd_cat_titulos = :idT", {idP: idPersona, idT: idTitulo})
    .getMany();
  }

  public deletAllRoles(idPersona: number, idTitulo: number): Promise<DeleteResult>{
    return getConnection()
    .getRepository(CdTransPersonasCatTitulos)
    .createQueryBuilder()
    .delete()
    .where("idcd_personas = :idP and idcd_cat_titulos = :idT", {idP: idPersona, idT: idTitulo})
    .execute();
  }
}

const transPersonasTituloDAO: TransPersonasTituloDAO = new TransPersonasTituloDAO();

export default transPersonasTituloDAO;
