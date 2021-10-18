import { TableNames, User } from ".";
import authDAO from "../dao/auth/AuthDAO";
import logDAO from "../dao/log/LogDAO";
import { AuthUser, LogActions, LogLogins } from "../model";

/**
 * Explicación Loggeo:
 * El loggeo registra: usuario, la acción, hora, notas e id que se vio involucrado.
 * Hace uso de ServiceExecutor. la ExecutonMetadata ahora tiene el objeto LogActionType opcional (puede loggear o no).
 * En cada ExecutionMetadata se guarda la res: Response, de ahí tomamos el usuario.
 * Entonces, basta que, desde cualquier controlador, al lanzar la executionmetadata, se agregue o no el logger.
 * El ServiceExector al terminar la ejecución de cada endpoint, checará si contiene un logAction que loggear. Si no, no hace nada.
 * Es por esto, que la lógica de todos los servicios queda intacta. Solo al finalizar cada servicio, en su ResponseJSON,
 * regresa el id idAffected del objeto que fue manipulado en el método.
 */
export type LogActionType = {
  action: Action;
  tabla: TableNames;
  notas?: string;
};

export enum Action {
  INSERTA = "INSERTA",
  ACTUALIZA = "ACTUALIZA",
  BAJA = "BAJA",
  ASOCIA = "ASOCIA",
  LEE = "LEE",
  BUSCA = "BUSCA",
  UPLOAD = "UPLOAD",
  ERROR = "ERROR",
}

function createEntity(
  data: LogActionType,
  idAffected: string,
  user: string
): LogActions {
  const logger: LogActions = new LogActions();
  logger.tabla = data.tabla;
  logger.action = data.action;
  logger.notas = data.notas;
  logger.idAffected = idAffected;
  logger.user = user;
  return logger;
}

export async function logAction(
  action: LogActionType,
  user: User,
  idAffected?: string
): Promise<void> {
  const logger: LogActions = createEntity(
    action,
    idAffected,
    user.usuario.username
  );
  const logged: LogActions = await logDAO.insertLogAction(logger);
  if (logged) console.log(`Registro: ${action.action} loggeado.`);
}

/** Loggea el acceso, en la tabla de log_login y además actualiza lastLogin del usuario.  */
export async function logLogin(user: AuthUser, ip: string): Promise<void> {
  const log: LogLogins = new LogLogins();
  log.user = user.username;
  log.ip = ip;
  const logged: LogLogins = await logDAO.insertAccessLogin(log);
  user.lastLogin = logged.time;
  await authDAO.insertUser(user);
  if (logged) console.log(`Inicio de sesión loggeado en DB.`);
}
