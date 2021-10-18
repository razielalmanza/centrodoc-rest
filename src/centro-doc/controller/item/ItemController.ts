import { Request, Response } from "express";
import {
  executeService,
  ExecutionMetadata,
  errorStrings,
  TableNames,
  Action,
} from "../../utils/";
import * as services from "../../services/item/ItemServices";
import { CdItem } from "../../model";

const tabla: TableNames = TableNames.item;

export function leeItem(tipoItem?: string) {
  return async (req: Request, res: Response) => {
    const meta: ExecutionMetadata = {
      defaultErrorMessage: errorStrings.ERROR_GET,
      response: res,
      service: services.leeItemService,
      preService: {
        input: [req.query.idcd_item, tipoItem],
        procedure: (id, tipoItem) => [id, tipoItem],
      },
      logAction: {
        tabla: TableNames[tipoItem],
        action: Action.LEE,
      },
    };
    return await executeService(meta);
  };
}
export function insertaItem(tipoItem: string) {
  return async (req: Request, res: Response) => {
    const meta: ExecutionMetadata = {
      defaultErrorMessage: errorStrings.ERROR_PUT,
      response: res,
      service: services.insertaItemService,
      preService: {
        input: [req.body, tipoItem],
        procedure: services.preInsertaItem,
      },
      logAction: {
        tabla: TableNames[tipoItem],
        action: Action.INSERTA,
      },
    };
    return await executeService(meta);
  };
}

export function actualizaItem(tipoItem: string) {
  return async (req: Request, res: Response) => {
    const meta: ExecutionMetadata = {
      defaultErrorMessage: errorStrings.ERROR_PUT,
      response: res,
      service: services.actualizaItemService,
      preService: {
        input: [req.body, tipoItem],
        procedure: services.preActualiza,
      },
      logAction: {
        tabla: TableNames[tipoItem],
        action: Action.ACTUALIZA,
      },
    };
    return await executeService(meta);
  };
}

export async function bajaItem(req: Request, res: Response) {
  const meta: ExecutionMetadata = {
    defaultErrorMessage: errorStrings.ERROR_PUT,
    response: res,
    service: services.bajaItemService,
    preService: {
      input: [req.query.idcd_item],
      procedure: preGetItem,
    },
    logAction: {
      tabla: tabla,
      action: Action.BAJA,
    },
  };
  return await executeService(meta);
}

async function preGetItem(idItem: number) {
  const cdItem: CdItem = await services.getItemByIdService(idItem);
  return [cdItem];
}

export function buscaItem(tipoItem: string) {
  return async (req: Request, res: Response) => {
    const meta: ExecutionMetadata = {
      defaultErrorMessage: errorStrings.ERROR_BUSQUEDA,
      response: res,
      service: services.buscaItemService,
      preService: {
        input: [req.body, tipoItem],
        procedure: services.preBusca,
      },
      logAction: {
        tabla: TableNames[tipoItem],
        action: Action.BUSCA,
      },
    };
    return await executeService(meta);
  };
}

export async function leeProxy(req: Request, res: Response) {
  const meta: ExecutionMetadata = {
    defaultErrorMessage: errorStrings.ERROR_GET,
    response: res,
    service: services.leeProxyService,
    preService: {
      input: [req.query.idcd_item],
      procedure: preGetItem,
    },
    logAction: {
      tabla: TableNames.digital,
      action: Action.LEE,
    },
  };
  return await executeService(meta);
}

export async function leeImagen(req: Request, res: Response) {
  const meta: ExecutionMetadata = {
    defaultErrorMessage: errorStrings.ERROR_GET,
    response: res,
    service: services.leeImagenService,
    preService: {
      input: [req.query.idcd_item],
      procedure: preGetItem,
    },
    logAction: {
      tabla: TableNames.digital,
      action: Action.LEE,
    },
  };
  return await executeService(meta);
}

export async function uploadImagen(req: Request, res: Response) {
  const meta: ExecutionMetadata = {
    failCode: 400,
    defaultErrorMessage: errorStrings.ERROR_GET,
    response: res,
    service: services.uploadService,
    preService: {
      input: [req.query.idcd_item, req.file],
      procedure: services.preUpload,
    },
    logAction: {
      tabla: TableNames.digital,
      action: Action.UPLOAD,
    },
  };
  return await executeService(meta);
}
