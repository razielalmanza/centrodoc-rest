import { getConnection, DeleteResult } from "typeorm";
import { LogActions } from "../../model";
import { Action, TableNames } from "../../utils";
import { LogLogins } from "../../model";

class LogDAO {
  tableName: string = "log";
  public insertLogAction(entity: LogActions): Promise<LogActions> {
    return getConnection().getRepository(LogActions).save(entity);
  }

  public delete(id: number): Promise<DeleteResult> {
    return null;
  }

  public update(user) {
    return getConnection().getRepository(LogActions).save(user);
  }

  public getById(id: number): Promise<LogActions> {
    return getConnection()
      .getRepository(LogActions)
      .createQueryBuilder(this.tableName)
      .where(`${this.tableName}.id = :id`, { id: id })
      .getOne();
  }
  public getByTabla(tabla: TableNames): Promise<LogActions[]> {
    return getConnection()
      .getRepository(LogActions)
      .createQueryBuilder(this.tableName)
      .where(`${this.tableName}.tabla = :tabla`, { tabla: tabla })
      .getMany();
  }

  public getByAction(action: Action): Promise<LogActions[]> {
    return getConnection()
      .getRepository(LogActions)
      .createQueryBuilder(this.tableName)
      .where(`${this.tableName}.action = :action`, { action: action })
      .getMany();
  }

  public getByActionAndTabla(
    action: Action,
    tabla: TableNames
  ): Promise<LogActions[]> {
    return getConnection()
      .getRepository(LogActions)
      .createQueryBuilder(this.tableName)
      .where(
        `${this.tableName}.action = :action and ${this.tableName}.tabla = :tabla`,
        { action: action, tabla: tabla }
      )
      .getMany();
  }

  public getAll(): Promise<LogActions[]> {
    return getConnection()
      .getRepository(LogActions)
      .createQueryBuilder("LogActions")
      .getMany();
  }

  public insertAccessLogin(entity: LogLogins): Promise<LogLogins> {
    return getConnection().getRepository(LogLogins).save(entity);
  }
}

const logDAO: LogDAO = new LogDAO();

export default logDAO;
