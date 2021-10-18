import { ResponseJSON, ErrorResponse, infoStrings, errorStrings, mapQueryToWhereLikeString } from "../../utils";
import { CdPersonas, CdTransPersonasCatTitulos } from "../../model";
import personasDAO from "../../dao/personas/PersonaDAO";
import { deleteAllRolesService, getByRolesService, insertByIdService } from "./TransPersonasTitulosServices";

export const preCreateEntity = (data) => {
  const persona: CdPersonas = new CdPersonas();
  setEntityFields(persona, data);
  // TODO buscar por nombre y si no está crear ????? las entidades de las personas.
  // TODO en el front mostrar lista de personas a elegir
  return [persona];
};

const setEntityFields = async (persona: CdPersonas, data) => {
  persona.nombre = data.nombre;
  persona.tipoPersona = data.tipo_persona;
};

export async function getPersonaByIdService(personaId: number) {
  console.log(`Persona a buscar: ${personaId}`);
  const titulo: CdPersonas = await personasDAO.getById(personaId);
  if (!titulo)
    throw new ErrorResponse(
      `Persona con id: ${personaId} no encontrado.`,
      true
    ); // Puede ir con mensaje especefico.
  //if (!titulo) throw new ErrorResponse("Esto solo sale en la terminal ", false);
  return titulo;
}

export async function getPersonaByNombreService(nombre: string) {
  console.log(`Persona a buscar: ${nombre}`);
  const titulo: CdPersonas = await personasDAO.getByNombre(nombre);
  return titulo;
}

export async function leePersonaService(personaId: number) {
  const titulo: CdPersonas = await getPersonaByIdService(personaId);
  return {
    success: true,
    message: infoStrings.SUCCESS_GET,
    data: titulo,
  } as ResponseJSON;
}

export async function buscaPersonaService(query: string, page: any) {
  const [persona, count] = await personasDAO.getByQuery(query, page);
  if (!persona) throw new Error();
  return {
    success: true,
    message: infoStrings.SUCCESS_GET,
    data: persona,
    count: count
  } as ResponseJSON;
}

export async function preBusca(queryParams: any) {
  const {  take = 1, skip = 0 } = queryParams;
  if(!take) 
    throw new ErrorResponse(errorStrings.ERROR_NO_PAGE, true);
  const page = {
    take: take,
    skip: skip,
  }
  const [where] = await mapQueryToWhereLikeString(queryParams, "persona");
  return [where, page];
}

export async function insertaPersonaService(titulo: CdPersonas) {
  const personaInserted = await personasDAO.insert(titulo);
  if (!personaInserted) throw new Error();
  return {
    success: true,
    message: infoStrings.SUCCESS_PUT,
  } as ResponseJSON;
}

/**
 * Usamos el getPersonaByNombre para ver si ya existe, si no, regresamos el entity.
 * @param data 
 * @returns 
 */
export async function preInserta(data: any){
  const found = await getPersonaByNombreService(data.nombre);
  if (found) throw new ErrorResponse(
    `Persona con nombre: ${found.nombre} ya existe, con id: [${found.idcdPersonas}] `,
    true
  );
  const persona = preCreateEntity(data);
  return persona;
}

/**
 * Dos casos: 
 * uno, el simple, actualiza la entity que se indica con el id.
 * dos, actualiza con titulos.
 */
export async function actualizaPersonaService(oldPersona: CdPersonas, data: any) {
  let idToReturn = null;
  let messageToReturn = "";
  const titulosAfectados: [] = data.ids_titulos_afectados;
  if(!titulosAfectados || titulosAfectados.length == 0){
    idToReturn = await actualizaSimple(oldPersona, data);
    messageToReturn = infoStrings.UPDATE_PERSONA;
  }else{
    idToReturn = await actualizaConTitulos(data, titulosAfectados);
    messageToReturn = infoStrings.UPDATE_PERSONA_CON_TITULOS;
  } 
  return {
    success: true,
    message: messageToReturn,
    data: idToReturn,
  } as ResponseJSON;
}

async function actualizaSimple(entity: CdPersonas, data: any){
  setEntityFields(entity, data);
  const updated = personasDAO.update(entity);
  if (!updated) throw new Error();
  return entity.idcdPersonas;
}

/**
 * IMPORTANTE: Una persona puede tener múltiples roles en un mismo título, este método actualiza
 * todos los roles que una persona pueda tener en un dado título.
 * Checa si el nombre de la persona nueva ya existe, obtenemos su entity si sí.
 * si no, se inserta, hacemos uso de existsOrInsert().
 * Esto es mencionado debido a que, apesar de que se borrarán estas relaciones, hay que guardar los roles,
 * para poder relacionar cada rol correctamente con la persona a actualizar.
 * @param data El cuerpo del request
 * @param titulosAfectados Los ids de los títulos a afectar.
 */
async function actualizaConTitulos(data: any, titulosAfectados: any){
  const nuevaPersona: CdPersonas = await existsOrInsert(data);
  const relationsKeeper = [];
  /** Iteramos por cada titulo afectado, obtenemos y guardamos sus roles en relationsKeeper. Luego borramos. */
    for await (const id_afectado of titulosAfectados) {
      const oldRelations: any[] = await getByRolesService(data.idcd_personas, id_afectado);
      for await (const rel of oldRelations) {
        relationsKeeper.push({
          titulo: rel.idcdCatTitulos,
          rol: rel.rol
        });
      }
      await deleteAllRolesService(data.idcd_personas, id_afectado);
    }
    /** Insertamos las nuevas relaciones. */
    for await (const rel of relationsKeeper){
      await insertByIdService(nuevaPersona.idcdPersonas, rel.titulo, rel.rol);
    }
  return nuevaPersona.idcdPersonas;
}

export async function preActualiza(body: any) {
  const persona: CdPersonas = await getPersonaByIdService(
    body.idcd_personas
  );
  return [persona, body];
}

export async function asociadosService(idTitulo: number) {
  console.log(idTitulo);
  const personas: CdPersonas[] = await personasDAO.getByTituloId(idTitulo);
  if (!personas) throw new Error();
  return {
    success: true,
    message: infoStrings.SUCCESS_GET,
    data: personas,
  } as ResponseJSON;
}

/**
 * Recibe una lista de personas en formato JSON. Se usa el atributo _idcd_personas_ para
 * consultar en la base si existe, y obtener su entidad de tipo CdPersonas.
 * Si no se encuentra, se crea la entidad.
 * Regresando la lista de CdPersonas.
 */
export async function getPersonasById(listPersons): Promise<CdPersonas[]> {
  let lista: CdPersonas[] = [];
  for await (const p of listPersons) {
    let entity: CdPersonas = await getPersonaByIdService(p.idcd_personas);
    lista.push(entity);
    //console.log(entity);
  }
  return lista;
}

/**
 * Análogo a getPersonasById pero usando el _nombre_
 */
export async function getPersonasByNombre(listPersons): Promise<CdPersonas[]> {
  let lista: CdPersonas[] = [];
  for await (const p of listPersons) {
    let entity: CdPersonas = await personasDAO.getByNombre(p.nombre);
    lista.push(entity);
    //console.log(entity);
  }
  return lista;
}


/**
 * Recibe una lista de personas en formato JSON. 
 * A cada una ejecuta existsOrInsert().
 */
export async function existsOrInsertList(listPersons) {
  for await (const personData of listPersons) {
    await existsOrInsert(personData);
  }
}

/**
 * Recibe el body en json de una Persona y se usa el atributo _nombre_ para
 * consultar en la base si existe.
 * Si no se encuentra, se crea la entidad. y se inserta.
 * Regresa siempre la entidad creada, o la que ya exisita.
 */
export async function existsOrInsert(data: any): Promise<CdPersonas>{
  const id = data.nombre;
  let entity: CdPersonas = await personasDAO.getByNombre(id);
  if (!entity) {
    console.log(`Persona [${id}] no encontrada. Se inserta a base.`);
    entity = await preCreateEntity(data)[0];
    await personasDAO.insert(entity);
  }else{
    console.log(`Persona [${id}] encontrada. No se inserta a base.`);
  }
  return entity;
};