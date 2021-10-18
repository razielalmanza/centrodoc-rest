import { CdTransPersonasCatTitulos, CdCatTitulos, CdPersonas } from "../../model";
import transPersonasTituloDAO from "../../dao/personas/TransPersonasTitulosDAO";
import { ResponseJSON, infoStrings, ErrorResponse, errorStrings } from "../../utils";
import { getTituloByIdService } from "../titulos/TitulosServices";
import { getPersonasById } from "./PersonasServices";

export const preCreateEntity = (
  persona: CdPersonas,
  titulo: CdCatTitulos,
  rol: string
) => {
  const entity: CdTransPersonasCatTitulos = new CdTransPersonasCatTitulos();
  setEntityFields(entity, persona, titulo, rol);
  return entity;
};

const setEntityFields = async (
  entity: CdTransPersonasCatTitulos,
  persona: CdPersonas,
  titulo: CdCatTitulos,
  rol: string
) => {
  entity.idcdCatTitulos2 = titulo;
  entity.idcdPersonas2 = persona;
  entity.rol = rol;
};

/**
 * Recibe un _titulo: CdCatTitulos_ y la lista de relaciones.
 * Y por cada relación en la lista se crea una entidad TransPersonas con titulo y persona.
 * Agregando su rol y se inserta a la base.
 */
export async function asociaToTituloService(titulo: CdCatTitulos, listaRelaciones: any[]) {
  listaRelaciones.forEach(async (relacion) => {
    await addRelationSerivce(relacion.persona, titulo, relacion.rol);
  });
  return {
    success: true,
    message: infoStrings.SUCCESS_POST,
  } as ResponseJSON;
}

async function addRelationSerivce(persona: CdPersonas, titulo: CdCatTitulos, rol: string) {
  const relacion: CdTransPersonasCatTitulos = preCreateEntity(persona, titulo, rol);
  //console.log(relacion);
  try {
    await transPersonasTituloDAO.insert(relacion);
    console.log(
     // `INFO: La relación [${relacion.idcdCatTitulos2.idcdCatTitulos} - ${relacion.idcdPersonas2.idcdPersonas}] se ha agregado.`
     `INFO: La relación [${relacion.idcdCatTitulos} - ${relacion.idcdPersonas}] se ha agregado.`
    );
  } catch {
    // Se reporta el error en terminal, pero continúa la inserción de los demás.
    console.log(
     // `ERROR: La relación [${relacion.idcdCatTitulos2.idcdCatTitulos} - ${relacion.idcdPersonas2.idcdPersonas}] ya existe.`
      `ERROR: La relación [${relacion.idcdCatTitulos} - ${relacion.idcdPersonas}] ya existe.`

    );
  }
  //await transPersonasTituloDAO.insert(relacion);
}
/**
 * Analogo a asocia pero para eliminar la relación
 */
export async function desasociaToTituloService(
  titulo: CdCatTitulos,
  listaRelaciones: any[]
) {
  listaRelaciones.forEach(async (relacion) => {
    await deleteRelationService(relacion.persona, titulo, relacion.rol);
  });
  return {
    success: true,
    message: infoStrings.SUCCESS_POST,
  } as ResponseJSON;
}

export async function deleteRelationService(
  persona: CdPersonas,
  titulo: CdCatTitulos,
  rol: string
) {
  const relacion: CdTransPersonasCatTitulos = preCreateEntity(
    persona,
    titulo,
    rol
  );
  //console.log(relacion);
  try {
    await transPersonasTituloDAO.remove(relacion);
    console.log(`INFO: La relación [${relacion.idcdCatTitulos2.idcdCatTitulos} - ${relacion.idcdPersonas2.idcdPersonas}] se ha borrado.`);
  } catch {
    // Se reporta el error en terminal, pero continúa la inserción de los demás.
    console.log(Error);
    console.log( `ERROR: La relación [${relacion.idcdCatTitulos2.idcdCatTitulos} - ${relacion.idcdPersonas2.idcdPersonas}] no existe.`);
  }
}

/**
 * Obtiene la entity del título.
 * Obtiene la lista entities de las personas.
 * Si no existe la persona, error. Se espera que sean ids válidos.
 * Con la lista de personas se crea un par con su rol.
 * @param tituloId
 * @param listaP
 */
 export async function preAsociaToTitulo(tituloId, listaP) {
  let relaciones = [];
  const titulo: CdCatTitulos = await getTituloByIdService(tituloId);
  const personas = await getPersonasById(listaP);
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
/**
 * Dados un id de persona y titulo. Obtiene todas las relaciones de trans, con sus roles.
 */
export async function getByRolesService(personaId: number, tituloId: number){
  const relation: CdTransPersonasCatTitulos[] =
   await transPersonasTituloDAO.getRolesByRelation(personaId, tituloId);
  if(relation.length == 0) throw new ErrorResponse(`No hay relaciones [${personaId}] - [${tituloId}]`, true);
  return relation;
}
/**
 * Dados un id de persona y titulo. Borra todas las relaciones de trans que haya, sin importar rol.
 */
export async function deleteAllRolesService(personaId: number, tituloId: number){
  const deleted: any = await transPersonasTituloDAO.deletAllRoles(personaId, tituloId);
  if(!deleted) 
    throw new ErrorResponse(errorStrings.ERROR_DELETING, true);
  console.log(`La relación [${personaId}] - [${tituloId}] ha sido eliminada.`);
}

/**
 * Dados un id de persona, titulo y un rol, inserta en la base una nueva relación.
 */
export async function insertByIdService(personaId: string, tituloId: string, rol:string){
  const inserted =
   await transPersonasTituloDAO.insertByIds( personaId, tituloId, rol);
  if(!inserted) throw new ErrorResponse(errorStrings.ERROR_PUT);
}