import authDAO from "../dao/auth/AuthDAO";
import { AuthGroup, AuthUser } from "../model";

/**
 * Debe estar actualiza junto con los permisos del front end.
 * IMPORTANTE: AL AGREGAR UN PERMISO DEBE HACERSE AL FINAL DE LA LISTA,
 * PUES LA NUMERACIÓN CAMBIARÍA SI SE CAMBIA EL ORDEN, PROVOCANDO QUE ENTONCES LOS USUARIOS TUVIERAN PERMISOS INCORRECTOS EN SU TOKEN
 * SI SE PRESENTA UN CAMBIO NECESARIO, SERÍA BUENA IDEA CAMBIAR LA KEY_MASTER, ASÍ,
 * LOS TOKENS PASADOS NO SERÁN VÁLIDOS Y ENTONCES TENDRÍAN QUE INICISAR SESION DE NUEVO, DANDOLES LA NUMERACION CORRECTA.
 */
export enum Permisos {
  CAR_READ = 1,
  CAR_WRITE = 2,
  CARTEL_READ = 3,
  CARTEL_WRITE = 4,
  FOMO_READ = 5,
  FOMO_WRITE = 6,
  FOTO_READ = 7,
  FOTO_WRITE = 8,
  HEME_READ = 9,
  HEME_WRITE = 10,
  INDI_READ = 11,
  INDI_WRITE = 12,
  LIBROS_READ = 13,
  LIBROS_WRITE = 14,
  PERSON_READ = 15,
  PERSON_WRITE = 16,
  STILLS_READ = 17,
  STILLS_WRITE = 18,
  UNICA_READ = 19,
  UNICA_WRITE = 20,
  CAR_BAJA = 21,
  CARTEL_BAJA = 22,
  FOMO_BAJA = 23,
  FOTO_BAJA = 24,
  HEME_BAJA = 25,
  INDI_BAJA = 26,
  LIBROS_BAJA = 27,
  PERSON_BAJA = 28,
  STILLS_BAJA = 29,
  UNICA_BAJA = 30,
}

function getAllPermissions(): Permisos[] {
  let permissions: Permisos[] = [];
  for (const item in Permisos) {
    if (Number(item)) {
      permissions.push(Number(item));
    }
  }
  return permissions;
}

function getReadPermission(): Permisos[] {
  return [
    Permisos.CAR_READ,
    Permisos.CARTEL_READ,
    Permisos.FOMO_READ,
    Permisos.FOTO_READ,
    Permisos.HEME_READ,
    Permisos.INDI_READ,
    Permisos.LIBROS_READ,
    Permisos.PERSON_READ,
    Permisos.STILLS_READ,
    Permisos.UNICA_READ,
  ];
}

export const Groups = {
  adminCar: [Permisos.CAR_READ, Permisos.CAR_WRITE, Permisos.CAR_BAJA],
  adminCartel: [Permisos.CARTEL_READ, Permisos.CARTEL_WRITE, Permisos.CAR_BAJA],
  adminFomo: [Permisos.FOMO_READ, Permisos.FOMO_WRITE, Permisos.CAR_BAJA],
  adminFoto: [Permisos.FOTO_READ, Permisos.FOTO_WRITE, Permisos.CAR_BAJA],
  adminHeme: [Permisos.HEME_READ, Permisos.HEME_WRITE, Permisos.CAR_BAJA],
  adminIndi: [Permisos.INDI_READ, Permisos.INDI_WRITE, Permisos.CAR_BAJA],
  adminLibros: [Permisos.LIBROS_READ, Permisos.LIBROS_WRITE, Permisos.CAR_BAJA],
  adminPerson: [Permisos.PERSON_READ, Permisos.PERSON_WRITE, Permisos.CAR_BAJA],
  adminStills: [Permisos.STILLS_READ, Permisos.STILLS_WRITE, Permisos.CAR_BAJA],
  adminUnica: [
    Permisos.UNICA_READ,
    Permisos.UNICA_WRITE,
    Permisos.UNICA_BAJA,
  ] /**Tal vez cambiar el nombre de este permiso en la base de permisos. */,
  consulta: getReadPermission(),
  consultaUnica: [Permisos.UNICA_READ],
  superuser: getAllPermissions(),
  // STAFF: [],
};

/**
 * 'Diccionario' que contiene los permisos necesarios para cada url.
 * como algunas urls pueden ser iguales a otras, ejemplo: '/titulo/' puede ser insertar o leerporid.
 * se le agrega el método al principio de cada identificador, haciendo cada entrada única.
 * Por eso, para consultar se debe hacer method + url
 */
export const mapPermissionsUrls = {
  /* ESTOS ENDPOINTS AÚN NO TIENEN PERMISO.    
  'get/titulo': 
  'get/titulo/busca'
  'put/titulo'
  'patch/titulo'
  'get/titulo/asociadosToPersona'

  'get/persona'
  'get/persona/busca'
  'put/persona'
  'patch/persona'
  'get/persona/asociadasToTitulo'
  'post/persona/asocia'
  'post/persona/desasocia'

  'get/person'
  'get/person/busca'
  'put/person'
  'patch/person'

  'get/interprete'
  'get/interprete/busca'
  'put/interprete'
  'patch/interprete'
  'post/interprete/asocia'
  'post/interprete/desasocia'

  'get/catTipoItem'
  'get/catCartelTamanio'
  'get/catFotoTamanio'
  'get/catFotoColor'
  'get/catVideoExtras'
  'get/catVideoFormato'
  'get/catVideoPantalla'


  'get/item/proxy'
  'get/item/img'
  'post/item/upload'

  */
  "get/still": [Permisos.STILLS_READ],
  "get/fomo": [Permisos.FOMO_READ],
  "get/foro": [Permisos.FOTO_READ],
  "get/cartel": [Permisos.CARTEL_READ],
  "get/vhsdvd": [Permisos.UNICA_READ],

  "put/still": [Permisos.STILLS_WRITE],
  "put/fomo": [Permisos.FOMO_WRITE],
  "put/foro": [Permisos.FOTO_WRITE],
  "put/cartel": [Permisos.CARTEL_WRITE],
  "put/vhsdvd": [Permisos.UNICA_WRITE],

  "patch/still": [Permisos.STILLS_WRITE],
  "patch/fomo": [Permisos.FOMO_WRITE],
  "patch/foro": [Permisos.FOTO_WRITE],
  "patch/cartel": [Permisos.CARTEL_WRITE],
  "patch/vhsdvd": [Permisos.UNICA_WRITE],

  "get/still/busca": [Permisos.STILLS_READ],
  "get/fomo/busca": [Permisos.FOMO_READ],
  "get/foro/busca": [Permisos.FOTO_READ],
  "get/cartel/busca": [Permisos.CARTEL_READ],
  "get/vhsdvd/busca": [Permisos.UNICA_READ],

  "post/still/baja": [Permisos.STILLS_BAJA],
  "post/fomo/baja": [Permisos.FOMO_BAJA],
  "post/foro/baja": [Permisos.FOTO_BAJA],
  "post/cartel/baja": [Permisos.CARTEL_BAJA],
  "post/vhsdvd/baja": [Permisos.UNICA_BAJA],
};

/** Tipo Usuario para manejar al usuario a través de la ejecución del programa. */
export type User = {
  usuario: AuthUser;
  permisos?: Permisos[];
};
/*
export type Permiso =
  | "adminCar"
  | "adminCartel"
  | "adminFomo"
  | "adminFoto"
  | "adminHeme"
  | "adminIndi"
  | "adminLibros"
  | "adminLibros"
  | "adminPerson"
  | "adminStills"
  | "adminUnica"
  | "consulta"
  | "consultaUnica"
  | "is_superuser"
  | "is_staff";
*/

/**
 * Esta función tiene la función de asignar permisos de tipo _Permisos_ con un usuario AuthUser.
 * Recibe la lista de grupos en los que está un usuario.
 * De esa lista se hace el mapeo en la lista de grupos creados en Groups (enums).
 * NOTA: Hace el mapeo directo sobre los grupos, aún no se considera mappear directamente de permiso a permiso,
 * pues no son utilizados en la base original (no hay relaciones permiso-usuario).
 */
export async function permisosFromUser(user: AuthUser): Promise<Permisos[]> {
  if (user.isSuperuser) return Groups.superuser;
  let lista: Permisos[] = [];
  const grupos: AuthGroup[] = await authDAO.getGroupByUserId(user.id);
  for await (const grupo of grupos) {
    /** Obtenemos los permisos que corresponden a cada grupo */
    const permisos: Permisos[] = Groups[grupo.name];
    lista = lista.concat(permisos);
  }
  return lista;
}

/*function userHasPermission(required: Permisos[], userPermissions: Permisos[]): Boolean {
    let count: number = 0;
    for (const permission of userPermissions) {
      if (required.includes(permission)) count++;
    }
    return required.length === count;
}*/
