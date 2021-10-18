/**
 * Nombre de las Tablas en la base documentacion.
 */
export enum TableNames {
  cartel = "cd_item_cartel",
  still = "cd_item_still",
  vhs_dvd = "cd_vhs_dvd",
  foro = "cd_item_fotos_rodaje",
  fomo = "cd_item_fotomontajes",
  person = "cd_cat_personalidades",
  cat_values = "cat_values",
  titulos = "cd_cat_titulos",
  personas = "cd_personas",
  interpretes = "cd_interpretes",
  item = "cd_item",
  digital = "cd_item_digital",
}

/** Se usa para el correcto JOIN de las entidades hijo (stills, etc)
 * con la entidad padre cd_item_digital.
 */
export enum tableNamesToEntityJoin {
  digital = "cdItemDigital",
  cartel = "cdItemCartel",
  still = "cdItemStills",
  vhs_dvd = "cdVhsDvd",
  foro = "cdItemFotosRodaje",
  fomo = "cdItemFotomontajes",
}
