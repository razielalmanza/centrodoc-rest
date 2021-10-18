import {
  queriesCatValues,
  ResponseJSON,
  infoStrings,
  ErrorResponse,
  errorStrings,
} from "../../utils/";
import catValuesDAO from "../../dao/values/CatValuesDAO";

export async function catRequestService(request: string, page: any) {
  if (!page) throw new ErrorResponse(errorStrings.ERROR_NO_PAGE, true);
  // Obtiene el array con el tname y fname según sea el endpoint de donde viene.
  const requested = queriesCatValues[request];
  const result = await catValuesDAO.catRequest(requested, page);
  const count = await catValuesDAO.catRequestCount(requested);
  return {
    success: true,
    message: infoStrings.SUCCESS_GET,
    data: obejctAsArray(result),
    count: count,
  } as ResponseJSON;
}

export async function tipoItemService() {
  const result: any[] = await catValuesDAO.tipoItem();
  return {
    success: true,
    message: infoStrings.SUCCESS_GET,
    data: obejctAsArray(result),
  } as ResponseJSON;
}

/**
 * Itera sobre un array de objects y regresa solo una lista de values.
 * Necesaria pues las raw query con typeorm rgresan una lista
 * de entidades con redudancia,
 * donde el key de cada uno es el nombre de la tabla.
 * Nos ineresan solo los values.
 */
function obejctAsArray(object: Object[]): string[] {
  let array: string[] = [];
  for (const c of object) {
    array.push(Object.values(c).toString());
  }
  return array;
}
