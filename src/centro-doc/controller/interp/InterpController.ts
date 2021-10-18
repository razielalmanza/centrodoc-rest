import { Request, Response } from "express";
import {
  executeService,
  ExecutionMetadata,
  mapQuerytoBusquedaGlobal,
  errorStrings,
  ErrorResponse,
} from "../../utils";
import * as services from "../../services/interp/InterpServices";
import { CdItem } from "../../model";
import { getItemByIdService } from "../../services/item/ItemServices";
import * as transServices from "../../services/item/TransItemInterpServices";

export async function leeInterp(req: Request, res: Response) {
  const meta: ExecutionMetadata = {
    defaultErrorMessage: errorStrings.ERROR_GET,
    response: res,
    service: services.leeInterpService,
    preService: {
      input: [req.query.id],
      procedure: (input) => [input as string],
    },
  };
  return await executeService(meta);
}
export async function buscaInterp(req: Request, res: Response) {
  const meta: ExecutionMetadata = {
    defaultErrorMessage: errorStrings.ERROR_BUSQUEDA,
    response: res,
    service: services.buscaInterpService,
    preService: {
      input: [req.query],
      procedure: preBusca,
    },
  };
  return await executeService(meta);
}
/**
 * Crea el where necesario para la busqueda global.
 * En este caso solo se busca el quey en la columna 'nombre'
 */
async function preBusca(queryParams: any) {
  const { nombre, take = 1, skip = 0 } = queryParams;
  if (!take) throw new ErrorResponse(errorStrings.ERROR_NO_PAGE, true);
  const nameTable: string = "interp";
  const params: string[] = ["nombre"];
  const where: string = await mapQuerytoBusquedaGlobal(
    nameTable,
    nombre,
    params
  );
  const page = {
    take: take,
    skip: skip,
  };
  return [where, page];
}

export async function insertaInterp(req: Request, res: Response) {
  const meta: ExecutionMetadata = {
    defaultErrorMessage: errorStrings.ERROR_PUT,
    response: res,
    service: services.insertaInterpService,
    preService: {
      input: [req.query.id],
      procedure: services.preInserta,
    },
  };
  return await executeService(meta);
}

export async function actualizaInterp(req: Request, res: Response) {
  const meta: ExecutionMetadata = {
    defaultErrorMessage: errorStrings.ERROR_PATCH,
    response: res,
    service: services.actualizaInterpService,
    preService: {
      input: [req.query.id, req.body.nombre],
      procedure: services.preActualiza,
    },
  };
  return await executeService(meta);
}

export async function asociaToItem(req: Request, res: Response) {
  const meta: ExecutionMetadata = {
    defaultErrorMessage: errorStrings.ERROR_POST,
    response: res,
    service: transServices.asociaToItemService,
    preService: {
      input: [req.body.idcd_item, req.body.listaInterpretes],
      procedure: preAsociaToItem, // Del json del body obtiene la entidad del item
    },
  };
  return await executeService(meta);
}

async function preAsociaToItem(itemId, lista) {
  const item: CdItem = await getItemByIdService(itemId);
  return [item, lista];
}

export async function desasociaToItem(req: Request, res: Response) {
  const meta: ExecutionMetadata = {
    defaultErrorMessage: errorStrings.ERROR_POST,
    response: res,
    service: transServices.desasociaToItemService,
    preService: {
      input: [req.body.idcd_item, req.body.listaInterpretes],
      procedure: preAsociaToItem, // Del json del body obtiene la entidad del item
    },
  };
  return await executeService(meta);
}
