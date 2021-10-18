/** services to import */
import * as cartelServices from "../services/item/ItemCartelServices";
import * as stillServices from "../services/item/ItemStillsServices";
import * as vhsDvdServices from "../services/item/ItemVhsServices";
import * as foRoServices from "../services/item/ItemFoRoServices";
import * as foMoServices from "../services/item/ItemFoMoServices";
/** Entities to import */
import {
  CdItemCartel,
  CdItemFotomontajes,
  CdItemFotosRodaje,
  CdItemStills,
  CdVhsDvd,
} from "../model";

/**
 * Este archivo tiene el propósito de proporcionar los arrays que contengan
 * para cada tiempo de item (cartel, stills, etc) su entity en forma de clase.
 * Así como los createEntiity y setFields, los cuales sirven para crear un objeto de esa clase
 * con el body en un request cuando se busca insertar un item,
 * así como settear los campos, para el caso de actualizar.
 */

export const createEntityArray = {
  cartel: cartelServices.createEntity,
  still: stillServices.createEntity,
  vhs_dvd: vhsDvdServices.createEntity,
  foro: foRoServices.createEntity,
  fomo: foMoServices.createEntity,
};

export const entityClass = {
  cartel: CdItemCartel,
  still: CdItemStills,
  vhs_dvd: CdVhsDvd,
  foro: CdItemFotosRodaje,
  fomo: CdItemFotomontajes,
};
