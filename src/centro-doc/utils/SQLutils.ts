/** Maps body requests, query params (or any json) to where clausule. */
/**
 * Estos dos metodos cumplen el proposito de buscar algo específico en
 * cada columna que se necesite, ya se de forma estricta,
 * con un '=', o con un 'like'
 * Se evitan los parametros skip y take pues no van dentro de los wheres deseados, son la página.
 */

/** WHERE = '' type*/
export const mapQueryToWhereString = async (body: any, nameTable: string) => {
  let where: string = "";
  for (const key of Object.keys(body)) {
    if (typeof body[key] === "object" || key === "skip" || key === "take")
      continue;
    where += `${nameTable}.${key} = '${body[key]}' AND `;
  }
  where = where.slice(0, where.length - 4);
  return [where];
};

/** WHERE LIKE '% %' type*/
export const mapQueryToWhereLikeString = async (
  body: any,
  nameTable: string
) => {
  let where: string = "";
  for await (const key of Object.keys(body)) {
    if (typeof body[key] === "object" || key === "skip" || key === "take")
      continue;
    where += `${nameTable}.${key} LIKE '%${body[key]}%' AND `;
  }
  where = where.slice(0, where.length - 4);
  return [where];
};

/**
 * Regresa un WHERE donde se introduce un query a buscar, y se busca en cada una de los params.
 * Cumpliendo con la idea de conseguir una búsqueda global, es decir, un mismo query se busca
 * en distinas columnas. regresando las concidencias en cada una.
 * se usa un OR.
 * @param nameTable mombre de la tabla a usar, debe tener el nombre del createQueryBuilder
 * del DAO.
 * @param query el query que se desea encontrar coincidencias
 * @param params lista de columnas donde se busca encontrar coincidencias.
 */
export const mapQuerytoBusquedaGlobal = async (
  nameTable: string,
  query: string,
  params: string[]
) => {
  let where = "";
  params.forEach((p) => {
    where += `${nameTable}.${p} LIKE '%${query}%' OR `;
  });
  where = where.slice(0, where.length - 3);
  return where;
};
/**
 * El método cumple el objetivo de dar una busca de cd items.
 * Esta busqueda abarca dos tablas, la del cd_item padre y la del item específicio (cartel, etc).
 * Por eso es necesario obtener el tipo de item que es.
 * Primero crea el query base 'where' donde deja explicito el tipo de items que nos interesan.
 * Después con el body (donde se hayan los parametros de busqueda del cd_item padre)
 * y con el body.itemHijo checa los de la entidad especifica.
 * Es necesario explicar que se les trata diferente, pues que unos forman parte del select del item_padre
 * y otros del item_hijo, por eso estos lelvan el alias de 'join'.
 */
export const mapQueryBuscaItem = async (
  body: any,
  tipoItem: string
): Promise<string> => {
  let where: string = `item.tipo_item = '${tipoItem}'`;
  const result1 = await mapQueryToWhereLikeString(body, "item");
  const string1 = result1[0];
  if (string1 != "") {
    where = where.concat(" AND ");
    where = where.concat(string1);
  }
  if (body.itemHijo) {
    const result2 = await mapQueryToWhereLikeString(body.itemHijo, "join");
    const string2 = result2[0];
    if (string2 != "") where = where.concat(" AND ");
    where = where.concat(string2);
  }
  //console.log(where);
  return where;
};

export const queriesCatValues = {
  catCartelTamanio: {
    tname: "cartel",
    fname: "tama",
  },
  catFotoTamanio: {
    tname: "foto",
    fname: "tama",
  },
  catFotoColor: {
    tname: "foto",
    fname: "color",
  },
  catVideoExtras: {
    tname: "vhs_dvd",
    fname: "extras",
  },
  catVideoFormato: {
    tname: "vhs_dvd",
    fname: "formato",
  },
  catVideoPantalla: {
    tname: "vhs_dvd",
    fname: "pantalla",
  },
};
