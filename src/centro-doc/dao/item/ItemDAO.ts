import { getConnection, DeleteResult, UpdateResult } from "typeorm";
import ORMActions from "../InterfacesDAO";
import { CdItem } from "../../model/";

class ItemDAO implements ORMActions<CdItem> {
  tableName: string = "item";

  public insert(entity: CdItem): Promise<CdItem> {
    return getConnection().getRepository(CdItem).save(entity);
  }
  /**
   * Se crea con el proposito de tener un insert y update variable, dnde se recibe la clase de la entity a insertar/actualizar.
   */
  public insertByEntity(entity: any, tipoEntity: any): Promise<any> {
    return getConnection().getRepository(tipoEntity).save(entity);
  }

  public updateByEntity(entity: any, tipoEntity: any) {
    return getConnection()
      .getRepository(tipoEntity)
      .update({ idcdItem: entity.idcdItem }, entity);
  }

  public restore(entity: CdItem): Promise<UpdateResult> {
    return getConnection().getRepository(CdItem).restore(entity);
  }

  public delete(id: number): Promise<DeleteResult> {
    return getConnection().getRepository(CdItem).delete(id);
  }

  public remove(entity: CdItem): Promise<DeleteResult> {
    return getConnection().getRepository(CdItem).delete(entity);
  }

  public update(user) {
    return getConnection().getRepository(CdItem).save(user);
  }

  public getById(id: number): Promise<CdItem> {
    return (
      getConnection()
        .getRepository(CdItem)
        .createQueryBuilder(this.tableName)
        .where(
          `${this.tableName}.idcd_item = :id and ${this.tableName}.activo = 1`,
          { id: id }
        )
        //.leftJoinAndSelect(`${this.tableName}`, "join")
        .leftJoinAndSelect(`${this.tableName}.cdItemDigital`, "join2")
        .getOne()
    );
  }
  /**
   * Regresa la información de un cd_item según el tipo.
   * Siempre le agrega información del item_digital
   */
  public getByIdAndTipo(id: number, tipo: string): Promise<CdItem> {
    return getConnection()
      .getRepository(CdItem)
      .createQueryBuilder(this.tableName)
      .where(
        `${this.tableName}.idcd_item = :id and ${this.tableName}.activo = 1`,
        { id: id }
      )
      .leftJoinAndSelect(`${this.tableName}.${tipo}`, "join")
      .leftJoinAndSelect(`${this.tableName}.cdItemDigital`, "join2")
      .getOne();
  }
  /**
   * Se usa para búsqueda
   * Toma el query como el where donde viene ya el tipo de item con todos los parametros a buscar.
   * Ademas del toJoin que es el atributo de la clase CdItem para hacer el correcto Join según
   * el tipo de itemHijo
   **/
  public getByQuery(query: string, toJoin: string): Promise<any> {
    return (
      getConnection()
        .getRepository(CdItem)
        .createQueryBuilder(this.tableName)
        .leftJoinAndSelect(`${this.tableName}.${toJoin}`, "join")
        .where(query)
        //.leftJoinAndSelect("join.idcdItem2", "join2")
        .getMany()
    );
  }
  /**
   * Misma implementación que getByQuery(), solo recibimos los atributos de la pagina.
   * Hacemos uso de typeorm para ejecutar la usqueda paginada.
   * orderBy está desactivado por ahora.
   */
  public buscaPaginada(
    query: string,
    toJoin: string,
    pagina: any
  ): Promise<any> {
    return (
      getConnection()
        .getRepository(CdItem)
        .createQueryBuilder(this.tableName)
        .leftJoinAndSelect(`${this.tableName}.${toJoin}`, "join")
        .where(query)
        .take(pagina.take)
        .skip(pagina.skip)
        //.orderBy(pagina.orderBy, pagina.order)
        .getManyAndCount()
    );
  }

  public getAll(): Promise<CdItem[]> {
    return getConnection()
      .getRepository(CdItem)
      .createQueryBuilder("CdItem")
      .getMany();
  }
}

const itemDAO: ItemDAO = new ItemDAO();

export default itemDAO;
