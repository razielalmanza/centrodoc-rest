import { AuthUser, AuthGroup, AuthUserGroups } from "../../model";

import { getConnection, InsertResult } from "typeorm";

class AuthDAO {
  public getUserByName(name: string): Promise<AuthUser> {
    return getConnection()
      .getRepository(AuthUser)
      .createQueryBuilder("user")
      .where(`user.username = :name`, { name: name })
      .getOne();
  }
  /** Regresa los AuthGroups de un usuario, es decir los grupos en los que está.
   * Toma la tabla AuthGroup y le hace join a sus relaciones (authUserGroups),
   * y regresa los grupos que sean del usuario requerido (id).
   */
  public getGroupByUserId(id: number): Promise<AuthGroup[]> {
    return getConnection()
      .getRepository(AuthGroup)
      .createQueryBuilder("grupos")
      .leftJoinAndSelect("relacion.authUserGroups", "join")
      .where(`join.userId = :id`, { id: id })
      .getMany();
  }

  public insertUser(user: AuthUser): Promise<AuthUser> {
    return getConnection().getRepository(AuthUser).save(user);
  }
}

const authDAO: AuthDAO = new AuthDAO();

export default authDAO;
