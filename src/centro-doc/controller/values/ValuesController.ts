import { Request, Response } from "express";
import { executeService, ExecutionMetadata, errorStrings } from "../../utils";

import * as services from "../../services/values/ValuesServices";

/**
 * Todos los endpoints de CatValues excepto tipos de Item llegan aquí.
 * Ya que todas conectan a la tabla cat_values.
 * @param endpoint recupera los parametros que necesita.
 */
export function catValRequest(endpoint: string) {
  return async (req: Request, res: Response) => {
    const meta: ExecutionMetadata = {
      defaultErrorMessage: errorStrings.ERROR_GET,
      response: res,
      service: services.catRequestService,
      preService: {
        input: [endpoint, req.query.take, req.query.skip],
        procedure: (endpoint, take, skip) => {
          const pagina = {
            take: take,
            skip: skip,
          };
          return [endpoint, pagina];
        },
      },
    };
    return await executeService(meta);
  };
}

export async function tipoItem(req: Request, res: Response) {
  const meta: ExecutionMetadata = {
    defaultErrorMessage: errorStrings.ERROR_GET,
    response: res,
    service: services.tipoItemService,
  };
  return await executeService(meta);
}
