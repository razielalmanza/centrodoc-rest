import { CdVhsDvd } from "../../model";

export function createEntity(data: any) {
  const item: CdVhsDvd = new CdVhsDvd();
  setEntityFields(item, data);
  return item;
}

export function setEntityFields(item: CdVhsDvd, data: any) {
  const placeholder = "tpm value";
  //console.log(data);
  item.audio = data.audio;
  item.color = data.color;
  item.duracion = data.duracion;
  item.extras = data.extras;
  item.formato = data.formato;
  item.idioma = data.idioma;
  item.intertitulos = data.intertitulos;
  item.subtitulos = data.subtitulos;
  item.norma = data.norma;
  item.observaciones = data.observaciones;
  item.pantalla = data.pantalla;
  item.region = data.region;
}
