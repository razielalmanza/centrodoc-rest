import { CdItemCartel } from "../../model";

export function createEntity(data: any) {
  const item: CdItemCartel = new CdItemCartel();
  setEntityFields(item, data);
  return item;
}

export function setEntityFields(item: CdItemCartel, data: any) {
  const placeholder = "tpm value";
  //console.log(data);
  item.institucion = data.institucion;
  item.pais = data.pais;
  item.tama = data.tama;
  item.ejemplares = data.tama;
  item.diseniador = data.diseniador;
  item.tecnica = data.tecnica;
  item.estadoFisico = data.estado_fisico;
  item.carConsulta = data.car_consulta || placeholder;
}
