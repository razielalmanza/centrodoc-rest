import itemDAO from "../../dao/item/ItemDAO";
import { CdItem, CdItemDigital } from "../../model";
import {
  ErrorResponse,
  ResponseJSON,
  infoStrings,
  tableNamesToEntityJoin,
  entityClass,
  createEntityArray,
  errorStrings,
  mapQueryBuscaItem,
  checkIsImage,
  proxyImage,
  saveImage,
} from "../../utils";
import * as digitalServices from "./ItemDigitalServices";
import itemDigitalDAO from "../../dao/item/ItemDigitalDAO";
import env from "../../config";
import path from "path";

export function createEntity(data: any) {
  const item: CdItem = new CdItem();
  setEntityFields(item, data);
  return item;
}

async function setEntityFields(item: CdItem, data: any) {
  item.idcdCatTitulos2 = data.idcd_cat_titulos;
  item.idcdCatPersonalidades = data.idcd_cat_personalidades;
  item.fechaHoraInsercion = data.fechaHoraInsercion;
  item.tipoItem = data.tipo_item;
  item.imagenDigital = data.imagen_digital;
  item.camposComunes = data.campos_comunes;
  item.fotoOldInterpretes = data.foto_old_interpretes;
  item.activo = data.activo || true;
  item.colocacion = data.colocacion;
  item.notas = data.notas;
}
/**
 * Regresa el cd_item, según el tipo que quiera recibir.
 * Si no recibe el tipo ejecuta un get génrico de solo el cd_item con su item_digital.
 */
export async function getItemByIdService(
  itemId: number,
  tipoEntity?: string
): Promise<CdItem> {
  let item: CdItem;
  console.log(`Item a buscar: ${itemId}, de tipo [${tipoEntity}]`);
  if (tipoEntity) item = await itemDAO.getByIdAndTipo(itemId, tipoEntity);
  else item = await itemDAO.getById(itemId);

  if (!item)
    throw new ErrorResponse(`Item con id: ${itemId} no encontrado.`, true); // Puede ir con mensaje especefico.
  return item;
}

export async function leeItemService(itemId: number, tipo: string) {
  const tipoEntity: string = tableNamesToEntityJoin[tipo];
  const item: CdItem = await getItemByIdService(itemId, tipoEntity);
  return {
    success: true,
    message: infoStrings.SUCCESS_GET,
    data: item,
    idAffected: item.idcdItem,
  } as ResponseJSON;
}

/**
 * Recibimos las tres entidades creadas.
 * Insertamos primeros cd_item y con ese id de recien insertado lo usamos
 * para darle ese primary key al cd_item hijo y al item_digital.
 * Recibimo el tipo de entity que insertaremos según su tipo en el insert del itemHijo.
 * Notar que itemDigital puede llegar null. Pero no entityHijo ni cdItem.
 * Puede recibir el parámetro 'notMain', cuando el servicio es llamado desde otros lugares que no requieren
 * regrear JSON como responses http. Usada desde InsertaPersonalidad.
 */
export async function insertaItemService(
  item: CdItem,
  itemHijo: any,
  itemDigital: CdItemDigital,
  tipoEntity: any,
  notMain?: boolean
) {
  const mainInsert = await itemDAO.insert(item);
  console.log(
    `Se insertó cdItem con id: ${mainInsert.idcdItem}, de tipo ${tipoEntity}`
  );
  itemHijo.idcdItem = mainInsert.idcdItem;
  const hijoInsert = await itemDAO.insertByEntity(itemHijo, tipoEntity);
  if (itemDigital) {
    // Si hay un item_digital se inserta
    itemDigital.idcdItem = mainInsert.idcdItem;
    await itemDigitalDAO.insert(itemDigital); // Este dao es fijo pues siempre metemos uno digital.
  }
  if (notMain) return; // Nos salimos antes de regresar excepciones/responses
  if (!mainInsert || !hijoInsert)
    throw new ErrorResponse(errorStrings.ERROR_INSERT_ITEM, true);
  return {
    success: true,
    message: infoStrings.SUCCESS_PUT,
    data: mainInsert,
    idAffected: mainInsert.idcdItem,
  } as ResponseJSON;
}

/**
 * Primero creamos la entidad padre del cd_item que sabemos siempre existirá.
 * Después usando el tipoItem que lo obtenemos según de qué endpoint venimos (o el 'tipo_item' que se manda desde otro pre).
 * obtenems el tipo de entity al que se insertará así como el createEntity para crear una entity
 * según sea el tipo: cartel, fomo, etc.
 * Se crea el Item Digital, si existe un itemDIgital en el body.
 */
export function preInsertaItem(data: any, tipoItem: string) {
  const item: CdItem = createEntity(data);
  const entityName: any = entityClass[tipoItem];
  const tipoCreate: any = createEntityArray[tipoItem];
  const itemHijo: any = tipoCreate(data.itemHijo);
  let itemDigital: CdItemDigital = null;
  /** Si en el body del request hay un item_digital, se crea, si no se manda null. */
  if (data.itemDigital)
    itemDigital = digitalServices.createEntity(data.itemDigital);
  return [item, itemHijo, itemDigital, entityName];
}
/**
 * Análogo a insertaItemService.
 */
export async function actualizaItemService(
  item: CdItem,
  itemHijo: any,
  itemDigital: CdItemDigital,
  tipoEntity: any
) {
  const mainInsert = await itemDAO.update(item);
  itemHijo.idcdItem = mainInsert.idcdItem;
  const hijoInsert = await itemDAO.updateByEntity(itemHijo, tipoEntity);
  if (itemDigital) {
    // Si hay un item_digital se inserta el actualizado.
    itemDigital.idcdItem = mainInsert.idcdItem;
    await itemDigitalDAO.insert(itemDigital); // Este dao es fijo pues siempre metemos uno digital.
  }
  if (!mainInsert || !hijoInsert)
    throw new ErrorResponse(errorStrings.ERROR_UPDATE_ITEM, true);
  return {
    success: true,
    message: infoStrings.SUCCESS_PATCH,
    data: mainInsert,
    idAffected: mainInsert.idcdItem,
  } as ResponseJSON;
}
/**
 * Análogo a preInserta.
 * Obtiene el entity con id del cd_item a actualizar. Actualiza sus datos.
 * Obtiene la clase del entity correspndiente y su constructor según tipoItem.
 * Crea el itemHijo siempre, y el digital solo si se recibe el itemDigital en el body.
 * Regresa las tres entities y la clase del cd_item hijo.
 */
export async function preActualiza(data: any, tipoItem: string) {
  const item: CdItem = await getItemByIdService(data.idcd_item);
  setEntityFields(item, data);
  const tipoCreate: any = createEntityArray[tipoItem];
  const entityName: any = entityClass[tipoItem];
  const itemHijo: any = tipoCreate(data.itemHijo);
  let itemDigital: CdItemDigital = null;
  /** Si en el body del request hay un item_digital, se crea, si no se manda null. */
  if (data.itemDigital)
    itemDigital = digitalServices.createEntity(data.itemDigital);
  return [item, itemHijo, itemDigital, entityName];
}

export async function bajaItemService(cdItem: CdItem) {
  bajaItem(cdItem);
  await itemDAO.update(cdItem);
  return {
    success: true,
    message: infoStrings.SUCCESS_BAJA,
    idAffected: cdItem.idcdItem,
  } as ResponseJSON;
}

function bajaItem(cdItem: CdItem) {
  cdItem.activo = false;
}
/**
 * @param query clausula where de la busqueda
 * @param join el atributo de la clase principal CdItem para hacer join cel itemHijo
 * @returns
 */
export async function buscaItemService(
  query: string,
  join: string,
  pagina: any
) {
  //console.log(query, tipoItem, join);
  const [items, count] = await itemDAO.buscaPaginada(query, join, pagina);
  if (!items) throw new Error();
  return {
    success: true,
    message: infoStrings.SUCCESS_GET,
    data: items,
    count: count,
  } as ResponseJSON;
}

export async function preBusca(body: any, tipoItem: string) {
  const whereString = await mapQueryBuscaItem(body, tipoItem);
  const join: string = tableNamesToEntityJoin[tipoItem];
  return [whereString, join, body.pagina];
}

export async function leeProxyService(item: CdItem) {
  if (!item.cdItemDigital)
    throw new ErrorResponse(
      `El item [${item.idcdItem}] no tiene item digital.`,
      true
    );
  return {
    success: true,
    message: infoStrings.SUCCESS_GET,
    data: { nombreProxy: item.cdItemDigital.nombreProxy },
  } as ResponseJSON;
}

export async function leeImagenService(item: CdItem) {
  if (!item.cdItemDigital)
    throw new ErrorResponse(
      `El item [${item.idcdItem}] no tiene item digital.`,
      true
    );
  return {
    success: true,
    message: infoStrings.SUCCESS_GET,
    data: { nombreArchivo: item.cdItemDigital.nombreArchivo },
    idAffected: item.idcdItem,
  } as ResponseJSON;
}

export async function uploadService(item: CdItem, file: any) {
  const nombreOriginal = file.originalname;
  const path: string = env.tempFileLocation;
  saveImage(file, path);
  const proxyBuffer: Buffer = await proxyImage(file.buffer);
  const fileProxy = {
    originalname: "proxy_" + nombreOriginal,
    buffer: proxyBuffer,
  };
  saveImage(fileProxy, path);
  item.cdItemDigital.nombreArchivo = path + nombreOriginal;
  item.cdItemDigital.nombreProxy = path + "proxy_" + nombreOriginal;
  const updated = await itemDigitalDAO.update(item.cdItemDigital);
  if (!updated) throw new Error();
  return {
    success: true,
    message: infoStrings.SUCCESS_POST,
  } as ResponseJSON;
}
/**
 * Obtiene el entity del item.
 * Verifica que tiene un cdItem digital, el tamaño del archivo y la extensión.
 */
export async function preUpload(itemId: number, file: any) {
  const item: CdItem = await getItemByIdService(itemId);
  if (!item.cdItemDigital)
    throw new ErrorResponse(
      `El item [${item.idcdItem}] no tiene item digital.`,
      true
    );
  if (file.size / 1000 > env.limitFileSize)
    throw new ErrorResponse(errorStrings.ERROR_LIMIT_FILE_SIZE, true);
  const ext: string = path.extname(file.originalname);
  if (!(await checkIsImage(ext)))
    throw new ErrorResponse(errorStrings.ERROR_NOT_IMAGE_EXT, true);
  return [item, file];
}
