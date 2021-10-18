import interpDAO from "../../dao/interp/InterpDAO";
import { CdInterpretes } from "../../model";
import { ResponseJSON, infoStrings, ErrorResponse } from "../../utils";

export const preCreateEntity = (id) => {
  const interp: CdInterpretes = new CdInterpretes();
  setEntityFields(interp, id);
  // TODO crear sus cdItems, buscar por id y si no está crear ????? las entidades del item de item digital????.
  return interp;
};

const setEntityFields = async (interp: CdInterpretes, data) => {
  interp.nombre = data;
};

export async function getInterpByIdService(
  interpId: string
): Promise<CdInterpretes> {
  console.log(`Interprete a buscar: ${interpId}`);
  const person: CdInterpretes = await interpDAO.getById(interpId);
  if (!person)
    throw new ErrorResponse(
      `Interprete con id: ${interpId} no encontrado.`,
      true
    ); // Puede ir con mensaje especefico.
  return person;
}

export async function leeInterpService(interpId: string) {
  const interprete: CdInterpretes = await getInterpByIdService(interpId);
  return {
    success: true,
    message: infoStrings.SUCCESS_GET,
    data: interprete,
  } as ResponseJSON;
}

export async function buscaInterpService(query: string, page: any) {
  const [interps, count] = await interpDAO.getByQuery(query, page);
  if (!interps) throw new Error();
  return {
    success: true,
    message: infoStrings.SUCCESS_GET,
    data: interps,
    count: count,
  } as ResponseJSON;
}

export async function insertaInterpService(interp: CdInterpretes) {
  const inserted = await interpDAO.insert(interp);
  if (!inserted) throw new Error();
  return {
    success: true,
    message: infoStrings.SUCCESS_PUT,
  } as ResponseJSON;
}

/**
 * Pre servicio para saber si ya existe la entidad y rgeresar un error.
 * si no existe regresa la [entity: CdInterpretes] para un servicio posterior.
 * @param id
 */
export async function preInserta(id: string) {
  const found: CdInterpretes = await interpDAO.getById(id);
  if (found) throw new ErrorResponse(`Interprete: ${id} ya existe.`, true);
  // Si lo encuentra regresa un error. Si no, regresa la entidad como [] para continuar
  // insertandola.
  const entity: CdInterpretes = preCreateEntity(id);
  return [entity];
}

export async function actualizaInterpService(interp: CdInterpretes, newId) {
  const toDelete = interp.nombre;
  setEntityFields(interp, newId);
  const updated = await interpDAO.update(interp);
  await interpDAO.delete(toDelete);
  if (!updated) throw new Error();
  return {
    success: true,
    message: infoStrings.SUCCESS_PATCH,
  } as ResponseJSON;
}

export async function preActualiza(id, newId) {
  // Primero checa si existe una entidad a actualizar con ese id.
  // Si no existe, habrá terminado la ejecución.
  const entityToUpdate: CdInterpretes = await getInterpByIdService(id);
  // Si existe, busca que el nuevo id no esté ocupado.
  const newIdUsed: CdInterpretes = await interpDAO.getById(newId);
  if (newIdUsed)
    throw new ErrorResponse(
      `El nuevo id a actualizar: ${newId} ya existe como Interprete.`,
      true
    );
  return [entityToUpdate, newId];
}

/**
 * Recibe una lista de personas en formato JSON. Se itera pra
 * consultar en la base si existe, y obtener su entidad de tipo CdInterpretes.
 * Regresando la lista de CdInterpretes.
 */
export async function getInterpsById(listaInterps) {
  let lista: CdInterpretes[] = [];
  for await (const nombre of listaInterps) {
    const interpEntity: CdInterpretes = await getInterpByIdService(nombre);
    lista.push(interpEntity);
    //console.log(interpEntity);
  }
  return lista;
}
