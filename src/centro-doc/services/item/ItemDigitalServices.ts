import { CdItemDigital } from "../../model";

export function createEntity(data: any) {
  const item: CdItemDigital = new CdItemDigital();
  setEntityFields(item, data);
  return item;
}

export function setEntityFields(item: CdItemDigital, data: any) {
  const placeholder = "tpm value";
  //console.log(data);
  item.extension = data.extension || placeholder;
  item.resolucion = data.resolucion || placeholder;
  item.dpi = data.dpi;
  item.espacioColor = data.espacio_color;
  item.profundidadBits = data.profundidad_bits;
  item.nombreArchivo = data.nombre_archivo || placeholder;
  item.nombreProxy = data.nombre_proxy || placeholder;
}
