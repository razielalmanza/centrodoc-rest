import { CdItemStills } from "../../model";

export function createEntity(data: any) {
  const item: CdItemStills = new CdItemStills();
  setEntityFields(item, data);
  return item;
}

export function setEntityFields(item: CdItemStills, data: any) {
  const placeholder = "tpm value";
  //console.log(data);
  item.aFTotalEjemplares = data.a_f_total_ejemplares;
  item.aR = data.a_r_;
}
