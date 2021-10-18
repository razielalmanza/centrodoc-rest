import env from "../config";
export const errorStrings = {
  ERROR_GET: "Error al intentar obtener los datos solicitados.",
  ERROR_BUSQUEDA: "Error, puede verificar el nombre de sus atributos.",
  ERROR_PUT: "Error al insertar los datos. ",
  ERROR_PATCH: "Error al actualizar datos.",
  ERROR_LOGIN: "Error al iniciar sesión.",
  ERROR_POST: "Error en petición POST.",
  ERROR_INSERT_ITEM:
    "ERROR insertando, o el cd_item padre, hijo, o el digital.",
  ERROR_UPDATE_ITEM:
    "ERROR actualizando, o el cd_item padre, hijo, o el digital.",
  ERROR_INSERT_PERSONALIDAD: "Error insertando personalidad, checar listaItems",
  ERROR_DELETING: "Error borrando datos.",
  ERROR_RELACION_NO_EXISTE: "Error, relación no existe.",
  ERROR_DIGITAL_ITEM_NOT_EXISTS:
    "Error, el item solicitado no tiene un item digital. Edítelo y añada la información necesaria en la sección digital.",
  ERROR_LIMIT_FILE_SIZE: ` Error, el archivo excede el tamaño límite de ${env.limitFileSize} KBs.`,
  ERROR_NOT_IMAGE_EXT:
    "El archivo no es una imagen, o tiene una extensión errónea.",
  ERROR_NO_PERMISSIONS: "No cuenta con los permisos para ejecutar esta acción.",
  ERROR_USER_NOT_FOUND: "El usuario no existe en la base de datos.",
  ERROR_PASSWORD_INCORRECT: "La contraseña ingresada es incorrecta.",
  ERROR_USERNAME_USED: "El usuario ya existe.",
  ERROR_SIGNUP: "Error al registrar.",
  ERROR_TOKEN:
    "Error, token incorrecto, formato, con firma incorrecta o es vacío. Revisar header 'Authorization'",
  ERROR_NO_PAGE:
    "No se ha dado la [pagina] de la paginación en el body del request.",
  ERROR_NO_TITULO: "No existe el título recibido.",
};

export const infoStrings = {
  SUCCESS_GET: "Datos obtenidos correctamente.",
  SUCCESS_POST: "Datos envíados y salvados correctados.",
  SUCCESS_PUT: "Datos insertados correctamente.",
  SUCCESS_PATCH: "Datos actualizados correctamente.",
  SUCCESS_BAJA: "Baja realizada correctamente.",
  UPDATE_PERSONA:
    "Se actualizan todos los titulos de la persona. No se crea nueva, pues no hay titulos_afectados o es vacío",
  UPDATE_PERSONA_CON_TITULOS:
    "Se actualizan los titulos y roles de lista titulos afectados.",
  SUCCESS_UPLOAD_IMAGE: "Se actualiza imagen y proxy correctamente.",
  SUCCESS_SIGNUP: "Se ha registrado el usuario.",
  SUCCESS_SIGNUP_SUPERUSER: "Se ha registrado un superususario.",
};
