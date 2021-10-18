import { Request, Response } from "express";
import {
  executeService,
  ExecutionMetadata,
  errorStrings,
  mapQueryToWhereLikeString,
} from "../../utils";
import * as services from "../../services/personas/PersonasServices";
import * as transServices from "../../services/personas/TransPersonasTitulosServices";

export async function leePersona(req: Request, res: Response) {
  const meta: ExecutionMetadata = {
    defaultErrorMessage: errorStrings.ERROR_GET,
    response: res,
    service: services.leePersonaService,
    preService: {
      input: [req.query.idcd_personas],
      procedure: (input) => [input as number],
    },
  };
  return await executeService(meta);
}

export async function buscaPersona(req: Request, res: Response) {
  const meta: ExecutionMetadata = {
    defaultErrorMessage: errorStrings.ERROR_BUSQUEDA,
    response: res,
    service: services.buscaPersonaService,
    preService: {
      input: [req.query],
      procedure: services.preBusca,
    },
  };
  return await executeService(meta);
}

export async function insertaPersona(req: Request, res: Response) {
  const meta: ExecutionMetadata = {
    defaultErrorMessage: errorStrings.ERROR_BUSQUEDA,
    response: res,
    service: services.insertaPersonaService,
    preService: {
      input: [req.body],
      procedure: services.preInserta,
    },
  };
  return await executeService(meta);
}

export async function actualizaPersona(req: Request, res: Response) {
  const meta: ExecutionMetadata = {
    defaultErrorMessage: errorStrings.ERROR_PATCH,
    response: res,
    service: services.actualizaPersonaService,
    preService: {
      input: [req.body],
      procedure: services.preActualiza,
    },
  };
  return await executeService(meta);
}

export async function asocidados(req: Request, res: Response) {
  const meta: ExecutionMetadata = {
    defaultErrorMessage: errorStrings.ERROR_GET,
    response: res,
    service: services.asociadosService,
    preService: {
      input: [req.query],
      procedure: (query) => [query.idcd_cat_titulos],
    },
  };
  return await executeService(meta);
}

export async function asociaToTitulo(req: Request, res: Response) {
  const meta: ExecutionMetadata = {
    defaultErrorMessage: errorStrings.ERROR_POST,
    response: res,
    service: transServices.asociaToTituloService,
    preService: {
      input: [req.query.idcd_cat_titulos, req.body],
      procedure: transServices.preAsociaToTitulo, // Del json del body obtiene la entidad del titulo
    },
  };
  return await executeService(meta);
}

export async function desasociaToTitulo(req: Request, res: Response) {
  const meta: ExecutionMetadata = {
    defaultErrorMessage: errorStrings.ERROR_POST,
    response: res,
    service: transServices.desasociaToTituloService,
    preService: {
      input: [req.query.idcd_cat_titulos, req.body],
      procedure: transServices.preAsociaToTitulo, // Del json del body obtiene la entidad del titulo
    },
  };
  return await executeService(meta);
}
