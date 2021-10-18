import personDAO from "../../dao/person/PersonalidadDAO";
import { CdCatPersonalidades } from "../../model";
import { ResponseJSON, infoStrings, ErrorResponse } from "../../utils/";
import { preInsertaItem, insertaItemService } from "../item/ItemServices";

export const preCreateEntity = (data) => {
  const person: CdCatPersonalidades = new CdCatPersonalidades();
  setEntityFields(person, data);
  // TODO crear sus cdItems, buscar por id y si no está crear ????? las entidades del item de item digital????.
  return [person];
};

const setEntityFields = async (person: CdCatPersonalidades, data) => {
  person.nombreArtistico = data.nombre_artistico;
  person.nombreVerdadero = data.nombre_verdadero;
  person.sobrenombre = data.sobrenombre;
  person.aRAcervoRepetido = data.a_r_acervo_repetido;
};

export async function getPersonalidadByIdService(personId: number) {
  console.log(`Personalidad a buscar: ${personId}`);
  const person: CdCatPersonalidades = await personDAO.getById(personId);
  if (!person)
    throw new ErrorResponse(
      `Personalidad con id: ${personId} no encontrado.`,
      true
    ); // Puede ir con mensaje especefico.
  return person;
}

export async function leePersonalidadService(personId: number) {
  const person: CdCatPersonalidades = await getPersonalidadByIdService(
    personId
  );
  return {
    success: true,
    message: infoStrings.SUCCESS_GET,
    data: person,
    idAffected: person.idcdCatPersonalidades,
  } as ResponseJSON;
}

export async function buscaPersonService(query: string, page: any) {
  const [persons, count] = await personDAO.getByQuery(query, page);
  if (!persons) throw new Error();
  return {
    success: true,
    message: infoStrings.SUCCESS_GET,
    data: persons,
    count: count,
  } as ResponseJSON;
}
/**
 * Recibe el entity de la personalidad y la lista con la lista de items necesarios.
 * Se inserta la personalidad, luego a cada elemento de la lista, que es una lista con:
 * cdItem, itemHijo, itemDigital, tipoDAO se inserta reusando el servicio de cdItem.
 * Al cdItem se lo settea el id de la personalidad que se acaba de crear. Para crear la relación buscada.
 * Todo sigue la lógica de inserta cdItem, con su pre. de ItemServicios
 */
export async function insertaPersonService(
  person: CdCatPersonalidades,
  listaItems: any[]
) {
  const personInserted: CdCatPersonalidades = await personDAO.insert(person);
  for await (const item of listaItems) {
    item[0].idcdCatPersonalidades = personInserted.idcdCatPersonalidades;
    await insertaItemService(item[0], item[1], item[2], item[3], true);
  }
  if (!personInserted) throw new Error();
  return {
    success: true,
    message: infoStrings.SUCCESS_PUT,
    idAffected: personInserted.idcdCatPersonalidades,
  } as ResponseJSON;
}

/**
 * Creamos la entity de la personalidad a insertar.
 * Luego por cada elemento de la lista 'listaItems' del request hacemos reuso del procedimiento
 * al insertar un item, usando su preCreate(obtener las entities correctas según sea su tipo de Item y si tiene digital)
 * Así como el proceso de inserción con insertaItemService, donde se inserta en el DAO correspondiente.
 */
export async function preInserta(data: any) {
  const [person] = preCreateEntity(data);
  //console.log(person);
  let listItemsEntities = [];
  for await (const item of data.listaItems) {
    const array = preInsertaItem(item, item.tipo_item);
    listItemsEntities.push(array);
  }
  //console.log(listItemsEntities);
  return [person, listItemsEntities];
}

export async function actualizaPersonService(
  person: CdCatPersonalidades,
  data
) {
  setEntityFields(person, data);
  const updated = await personDAO.update(person);
  if (!updated) throw new Error();
  return {
    success: true,
    message: infoStrings.SUCCESS_PATCH,
    idAffected: updated.idcdCatPersonalidades,
  } as ResponseJSON;
}
