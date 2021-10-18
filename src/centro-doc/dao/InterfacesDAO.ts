import { DeleteQueryBuilder, DeleteResult } from "typeorm";

/** Basic CRUD operations for ORM entities */
export default interface ORMActions<T> {
  /** Database CRUD */
  insert(entity: T): Promise<T>;
  delete(id: number | string): Promise<DeleteResult> | DeleteQueryBuilder<any>;
  update(id: number, updates);
  getById(id: number | string): Promise<T>;

  /** More actions (?)*/
  getAll(entity?): Promise<T[]>;
}
