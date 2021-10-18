import itemDAO from "../../dao/item/ItemDAO";
import titulosDAO from "../../dao/titulos/TitulosDAO";
import { CdCatTitulos, CdItem, CdTransPersonasCatTitulos } from "../../model";
import {
  infoStrings,
  ErrorResponse,
  ResponseJSON,
  errorStrings,
  mapQueryToWhereLikeString,
} from "../../utils";
import { getItemByIdService } from "../item/ItemServices";
import {
  existsOrInsertList,
  getPersonasByNombre,
} from "../personas/PersonasServices";
import { asociaToTituloService } from "../personas/TransPersonasTitulosServices";

export function createEntity(data) {
  const titulo: CdCatTitulos = new CdCatTitulos();
  setEntityFields(titulo, data);
  return titulo;
}

async function setEntityFields(titulo: CdCatTitulos, data) {
  titulo.tituloEnEspa = data.titulo_en_espa;
  titulo.tituloOriginal = data.titulo_original;
  titulo.anio = data.anio;
  titulo.anioFin = data.anio_fin;
  titulo.paisDeRealizacion = data.pais_de_realizacion;
  titulo.circa = data.circa;
}

export async function getTituloByIdService(tituloId: number) {
  console.log(`Titulo a buscar: ${tituloId}`);
  const titulo: CdCatTitulos = await titulosDAO.getById(tituloId);
  if (!titulo)
    throw new ErrorResponse(`Titulo con id: ${tituloId} no encontrado.`, true); // Puede ir con mensaje especefico.
  //if (!titulo) throw new ErrorResponse("Esto solo sale en la terminal ", false);
  return titulo;
}

export async function leeTituloService(tituloId: number) {
  const titulo: CdCatTitulos = await getTituloByIdService(tituloId);
  return {
    success: true,
    message: infoStrings.SUCCESS_GET,
    data: titulo,
  } as ResponseJSON;
}

export async function buscaTitulosService(query: string, page: any) {
  const [titulos, count] = await titulosDAO.getByQuery(query, page);
  if (!titulos) throw new Error();
  return {
    success: true,
    message: infoStrings.SUCCESS_GET,
    data: titulos,
    count: count,
  } as ResponseJSON;
}

export async function preBusca(queryParams: any) {
  const { take = 1, skip = 0 } = queryParams;
  if (!take) throw new ErrorResponse(errorStrings.ERROR_NO_PAGE, true);
  const page = {
    take: take,
    skip: skip,
  };
  const [where] = await mapQueryToWhereLikeString(queryParams, "titulo");
  return [where, page];
}

/**
 * Inserta la entidad del título.
 * Luego usa asociaToTituloService para asociar las personas al título.
 * @param titulo
 * @param listaPersonas
 */
export async function insertaTituloService(
  titulo: CdCatTitulos,
  listaPersonas
) {
  await titulosDAO.insert(titulo);
  const asociados = await asociaToTituloService(titulo, listaPersonas);
  if (!asociados) throw new Error();
  return {
    success: true,
    message: infoStrings.SUCCESS_PUT,
  } as ResponseJSON;
}

/**
 * Itera sobre la lista de personas, las que no existen, se crean en base.
 * Luego crea la entidad del título a insertar.
 * Obtiene la lista de entities de personas. Asegurándonos encontrar puesto que hemos hecho el primer paso antes.
 * Luego, relaciones esta lista con su rol.
 * @param body
 */
export async function preInsertaTitulo(body: any) {
  const listaP = body.listaPersonas;
  await existsOrInsertList(listaP);
  const titulo: CdCatTitulos = createEntity(body);
  const personas = await getPersonasByNombre(listaP);
  let relaciones = [];
  let i: number = 0;
  personas.forEach((p) => {
    relaciones.push({
      persona: p,
      rol: listaP[i].rol,
    });
    i++;
  });
  return [titulo, relaciones];
}

export async function actualizaTituloService(titulo: CdCatTitulos, data) {
  setEntityFields(titulo, data);
  const updated = titulosDAO.update(titulo);
  if (!updated) throw new Error();
  return {
    success: true,
    message: infoStrings.SUCCESS_PATCH,
  } as ResponseJSON;
}

export async function asociadosService(idPersona: number) {
  console.log(idPersona);
  const titulos: CdTransPersonasCatTitulos[] = await titulosDAO.getByPersonaId(
    idPersona
  );
  if (!titulos) throw new Error();
  return {
    success: true,
    message: infoStrings.SUCCESS_GET,
    data: titulos,
  } as ResponseJSON;
}

export async function asociaToItemService(item: CdItem, titulo_id: number) {
  if (item.idcdCatTitulos)
    throw new ErrorResponse(
      `El item ya tiene un titulo asociado: ${item.idcdCatTitulos} `,
      true
    );
  const titulo: CdCatTitulos = await getTituloByIdService(titulo_id);
  if (!titulo) throw new ErrorResponse(errorStrings.ERROR_NO_TITULO, true);
  item.idcdCatTitulos2 = titulo;
  const inserted = await itemDAO.insert(item);
  if (!inserted) throw new Error();

  return {
    success: true,
    message: infoStrings.SUCCESS_POST,
  } as ResponseJSON;
}

/**
 * Analogo a asocia pero para eliminar la relación
 */
export async function desasociaToItemService(item: CdItem, titulo_id: number) {
  const titulo: CdCatTitulos = await getTituloByIdService(titulo_id);
  if (!titulo) throw new ErrorResponse(errorStrings.ERROR_NO_TITULO, true);
  item.idcdCatTitulos2 = null;
  const inserted = await itemDAO.insert(item);
  if (!inserted) throw new Error();

  return {
    success: true,
    message: infoStrings.SUCCESS_POST,
  } as ResponseJSON;
}

export async function preAsociaToItem(itemId, titulo) {
  const item: CdItem = await getItemByIdService(itemId);
  return [item, titulo];
}
