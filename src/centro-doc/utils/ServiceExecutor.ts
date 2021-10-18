import { logAction, LogActionType, ResponseJSON } from "./";
import { Response } from "express";
import env from "../config";

/** Se empaqueta la ejecución de todo lo que courre desde que se llega al controlador hasta que regresa una respusta.
 * Acarreando al response, permitiendo fianlizar la ejecuión desde cualquier punto, y levantar errores especificos.
 * Evitacódigo repetitivo de repsuestas de JSON para el res.send()
 * Funcionamiento:
 * Se crea la interfaz MetadataService, donde se definen los servicios que usará, así como prepaación del input.
 * El preservice se puede usar para procesar el input (ejemplo: crear una entidad con datos del body)
 * De ahí lo que regrese el preService llega como lista de parámetros al service, continuando hasta al DAO.
 * Regresa una response y su estrucutura está definida de esta forma:
 */
type ResponseCode = 200 | 404 | 500 | 401 | 403 | 400;

type ServiceInput = any[];

type ProcedureOutput = ServiceInput | Promise<ServiceInput>;

type PreService = {
  //isAsync: boolean;
  input: any[];
  procedure(...input: any[]): ProcedureOutput;
};

const fixedErrorCode = 404;
const fixedSuccessCode = 200;

export interface ExecutionMetadata {
  successCode?: ResponseCode;
  failCode?: ResponseCode;
  response: Response;
  defaultErrorMessage?: string;
  service(...input: ServiceInput): Promise<ResponseJSON>;
  preService?: PreService;
  logAction?: LogActionType;
}
// Regresa una response
export const executeService = async (
  em: ExecutionMetadata
): Promise<Response> => {
  try {
    let serviceInput: ProcedureOutput = [];
    if (em.preService) {
      //if (em.preService.isAsync)
      serviceInput = await em.preService.procedure(...em.preService.input);
      //else serviceInput = em.preService.procedure(...em.preService.input);
    }
    const serviceResponse: ResponseJSON = await em.service(
      ...(await serviceInput)
    );
    if (serviceResponse) {
      /** Ejecuta el logger en DB si en el .env es 'true' y si hemos recibido un logAction. */
      if (env.loggerDb && em.logAction)
        await logAction(
          em.logAction,
          em.response.locals.user,
          serviceResponse.idAffected
        );
      em.response.status(em.successCode || fixedSuccessCode);
      return em.response.send(serviceResponse);
    }
  } catch (error) {
    console.error(error);
    const serviceResponse: ResponseJSON = {
      success: false,
      message: em.defaultErrorMessage,
    };
    if (error.toResponseJSON) serviceResponse.message = error.message;
    em.response.status(em.failCode || fixedErrorCode);
    return em.response.send(serviceResponse);
  }
};
