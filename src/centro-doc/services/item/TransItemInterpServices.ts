import { ResponseJSON, infoStrings } from "../../utils";
import { CdInterpretes, CdItem, CdTransItemInterpretes } from "../../model";
import { getInterpsById } from "../interp/InterpServices";
import transItemInterpDAO from "../../dao/interp/TransItemInterpDAO";

export const preCreateEntity = (
  interp: CdInterpretes,
  item: CdItem,
  xyStart?: string,
  xyEnd?: string
) => {
  const entity: CdTransItemInterpretes = new CdTransItemInterpretes();
  setEntityFields(entity, interp, item);
  return entity;
};

const setEntityFields = async (
  entity: CdTransItemInterpretes,
  interp: CdInterpretes,
  item: CdItem
) => {
  entity.idcdItem2 = item;
  entity.nombre2 = interp;
};

/**
 * Recibe un _item: CdItem_ y el body del request con la lista de interps a asociar.
 * Se obtiene la lista de entidades de _CdInterpretes_ con la lista JSON _lista_.
 * Y por cada interp en la lista se crea una entidad Transinterps con item e interp.
 * Y se inserta a la base.
 */
export async function asociaToItemService(item: CdItem, lista: any) {
  const interps: CdInterpretes[] = await getInterpsById(lista);
  //console.log(interps);
  let i: number = 0;
  interps.forEach(async (interp: CdInterpretes) => {
    await addRelationService(interp, item);
    i++;
  });

  return {
    success: true,
    message: infoStrings.SUCCESS_POST,
  } as ResponseJSON;
}

async function addRelationService(interp: CdInterpretes, item: CdItem) {
  const relacion: CdTransItemInterpretes = preCreateEntity(interp, item);
  //console.log(relacion);
  try {
    await transItemInterpDAO.insert(relacion);
    console.log(
      `INFO: La relación [${relacion.idcdItem2.idcdItem} - ${relacion.nombre2.nombre}] se ha agregado.`
    );
  } catch {
    // Se reporta el error en terminal, pero continúa la inserción de los demás.
    console.log(
      `ERROR: La relación [${relacion.idcdItem2.idcdItem} - ${relacion.nombre2.nombre}] ya existe.`
    );
  }
}

/**
 * Analogo a asocia pero para eliminar la relación
 */
export async function desasociaToItemService(item: CdItem, lista: any) {
  const interps: CdInterpretes[] = await getInterpsById(lista);
  //console.log(interps);
  let i: number = 0;
  interps.forEach(async (interp: CdInterpretes) => {
    await deleteRelationService(interp, item);
    i++;
  });

  return {
    success: true,
    message: infoStrings.SUCCESS_POST,
  } as ResponseJSON;
}

async function deleteRelationService(interp: CdInterpretes, item: CdItem) {
  const relacion: CdTransItemInterpretes = preCreateEntity(interp, item);
  //console.log(relacion);
  try {
    await transItemInterpDAO.remove(relacion);
    console.log(
      `INFO: La relación [${relacion.idcdItem2.idcdItem} - ${relacion.nombre2.nombre}] se ha borrado.`
    );
  } catch {
    // Se reporta el error en terminal, pero continúa la inserción de los demás.
    console.log(
      `ERROR: La relación [${relacion.idcdItem2.idcdItem} - ${relacion.nombre2.nombre}] no existe.`
    );
  }
}
