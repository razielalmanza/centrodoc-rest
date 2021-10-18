import { Request, Response } from "express";
import {
  executeService,
  ExecutionMetadata,
  mapQuerytoBusquedaGlobal,
  errorStrings,
  TableNames,
  Action,
  ErrorResponse,
} from "../../utils/";
import * as services from "../../services/person/PersonalidadServices";

const tabla: TableNames = TableNames.person;

export async function leePerson(req: Request, res: Response) {
  const meta: ExecutionMetadata = {
    defaultErrorMessage: errorStrings.ERROR_GET,
    response: res,
    service: services.leePersonalidadService,
    preService: {
      input: [req.query.idcd_cat_personalidades],
      procedure: (input) => [input],
    },
    logAction: {
      action: Action.LEE,
      tabla: tabla,
      notas: req.body.log_notas,
    },
  };
  return await executeService(meta);
}

export async function buscaPerson(req: Request, res: Response) {
  const meta: ExecutionMetadata = {
    defaultErrorMessage: errorStrings.ERROR_BUSQUEDA,
    response: res,
    service: services.buscaPersonService,
    preService: {
      input: [req.query],
      procedure: preBusca,
    },
    logAction: {
      action: Action.BUSCA,
      tabla: tabla,
    },
  };
  return await executeService(meta);
}
/**
 * Crea el where necesario para la busqueda
 */
async function preBusca(queryParams: any) {
  const { query, take = 1, skip = 0 } = queryParams;
  if (!take) throw new ErrorResponse(errorStrings.ERROR_NO_PAGE, true);
  const nameTable: string = "person";
  const params: string[] = [
    "nombre_artistico",
    "nombre_verdadero",
    "sobrenombre",
  ];
  const where: string = await mapQuerytoBusquedaGlobal(
    nameTable,
    query,
    params
  );
  const page = {
    take: take,
    skip: skip,
  };
  return [where, page];
}

export async function insertaPersonalidad(req: Request, res: Response) {
  const meta: ExecutionMetadata = {
    defaultErrorMessage: errorStrings.ERROR_INSERT_PERSONALIDAD,
    response: res,
    service: services.insertaPersonService,
    preService: {
      input: [req.body],
      procedure: services.preInserta,
    },
    logAction: {
      action: Action.INSERTA,
      tabla: tabla,
    },
  };
  return await executeService(meta);
}

export async function actualizaPersonalidad(req: Request, res: Response) {
  const meta: ExecutionMetadata = {
    defaultErrorMessage: errorStrings.ERROR_PATCH,
    response: res,
    service: services.actualizaPersonService,
    preService: {
      input: [req.body],
      procedure: preActualiza,
    },
    logAction: {
      action: Action.ACTUALIZA,
      tabla: tabla,
    },
  };
  return await executeService(meta);
}

async function preActualiza(body) {
  const person = await services.getPersonalidadByIdService(
    body.idcd_cat_personalidades
  );
  return [person, body];
}
