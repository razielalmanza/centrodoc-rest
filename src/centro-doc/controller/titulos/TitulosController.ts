import { Request, Response } from "express";
import { executeService, ExecutionMetadata, errorStrings } from "../../utils";
import * as services from "../../services/titulos/TitulosServices";

export async function leeTitulo(req: Request, res: Response) {
  const meta: ExecutionMetadata = {
    defaultErrorMessage: errorStrings.ERROR_GET,
    response: res,
    service: services.leeTituloService,
    preService: {
      input: [req.query.idcd_cat_titulos],
      procedure: (input) => [input],
    },
  };
  return await executeService(meta);
}

export async function buscaTitulos(req: Request, res: Response) {
  const meta: ExecutionMetadata = {
    defaultErrorMessage: errorStrings.ERROR_BUSQUEDA,
    response: res,
    service: services.buscaTitulosService,
    preService: {
      input: [req.query],
      procedure: services.preBusca,
    },
  };
  return await executeService(meta);
}

export async function insertaTitulos(req: Request, res: Response) {
  const meta: ExecutionMetadata = {
    defaultErrorMessage: errorStrings.ERROR_PUT,
    response: res,
    service: services.insertaTituloService,
    preService: {
      input: [req.body],
      procedure: services.preInsertaTitulo,
    },
  };
  return await executeService(meta);
}

export async function actualizaTitulo(req: Request, res: Response) {
  const meta: ExecutionMetadata = {
    defaultErrorMessage: errorStrings.ERROR_PATCH,
    response: res,
    service: services.actualizaTituloService,
    preService: {
      input: [req.body],
      procedure: preActualiza,
    },
  };
  return await executeService(meta);
}

async function preActualiza(body) {
  const titulo = await services.getTituloByIdService(body.idcd_cat_titulos);
  return [titulo, body];
}

export async function asociaToItem(req: Request, res: Response) {
  const meta: ExecutionMetadata = {
    defaultErrorMessage: errorStrings.ERROR_POST,
    response: res,
    service: services.asociaToItemService,
    preService: {
      input: [req.body.idcd_item, req.body.idcd_cat_titulos],
      procedure: services.preAsociaToItem, // Del json del body obtiene la entidad del item
    },
  };
  return await executeService(meta);
}

export async function desasociaToItem(req: Request, res: Response) {
  const meta: ExecutionMetadata = {
    defaultErrorMessage: errorStrings.ERROR_POST,
    response: res,
    service: services.desasociaToItemService,
    preService: {
      input: [req.body.idcd_item, req.body.idcd_cat_titulos],
      procedure: services.preAsociaToItem, // Del json del body obtiene la entidad del item
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
      procedure: (query) => [query.idcd_personas],
    },
  };
  return await executeService(meta);
}
