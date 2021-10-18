import { CdItemFotomontajes } from "../../model";

export function createEntity(data: any) {
  const item: CdItemFotomontajes = new CdItemFotomontajes();
  setEntityFields(item, data);
  return item;
}

export function setEntityFields(item: CdItemFotomontajes, data: any) {
  const placeholder = "tpm value";
  //console.log(data);
  item.ejemplares = data.ejemplares;
  item.pais = data.pais;
}
