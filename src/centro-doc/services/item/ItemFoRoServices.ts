import { CdItemFotosRodaje } from "../../model";

export function createEntity(data: any) {
  const item: CdItemFotosRodaje = new CdItemFotosRodaje();
  setEntityFields(item, data);
  return item;
}

export function setEntityFields(item: CdItemFotosRodaje, data: any) {
  const placeholder = "tpm value";
  //console.log(data);
  item.color = data.color;
  item.tama = data.tama;
}
