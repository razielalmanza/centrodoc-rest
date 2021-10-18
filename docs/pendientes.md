### Pendientes prioritarios:

- Hacer un endpoint para regresar info del token unicamente, util para consultar desde front end y mostarr info acorde. Y Para ver si es un token valido o no
- REFACTOR: usar idAffected en todos los servicos.
- Agregar en todos los controllers el logAction
- Agregar las notas al executionmetadata de los controllers que valgan la pena (actualizar, busqueda, etc)
- Checar los scripts de migración, obtener entidades en vez de crear siempre uno nuevo:
  FALTA fotomontajes, fotorodajes.
  DUDA: Cómo definir si es reutilizable cada entidad? ejemplo, person.py, personalidad: basta con sobrenombre?

### Pendientes:

- Algunos endpoints no tienen permisos aún.
- Poner la IP del inicio de sesión. Queda pendiente a cuando esté conectado en nginx con docker.

### Notas:

- se deja SET NULL en onDelete
- en /persona/asocia se toma el idcd_personas recibido, busca si existe, si no, no puede agregarlo. Ya que se está dejando un id, si estuviera en 0 se haría la busqueda como al agregar un titulo. Surge duda ya que en la petición se deja id y además contenido de la entidad.
- Ver por qué al crear una relación cdTransTitulosPersonas donde se relacione una persona como guinosta y también como director, por ejemplo, se queja pues la relación ya existe, solo puede haber un tipo de rol para cada persona por película. REPLICAR: (titulo/inserta)
  DUDA: problema continua, un objeto no puede tener las mismas primary keys. FIX, primary key tambipen rol.

### Consideraciones a futuro:

- roll back en base por si errores
- IMPORTANTE: en endpoints de actualizar entidades se debe mandar desde front los datos modificados y los originales también, si no, settearía en null los no modificados al no ir en la petición.
- IMPORTANTE: en endpoints de buscar deben ir solo con los atirubtos que se desea buscar, si se reciben vacios se genera problema
- IMPORTANTE: los atributos que recibimos en el backend (mandamos desde front) están en snake_case, los que se regresa desde el back esn camelCase
- Paginación: skip = (numero de pagina -1) \* take, el take se ajusta arbitrariamente (20?). regresamos el count ya desde back.
- llevar la lista de cómo identificamos los tipos de items (fomo, foro, vhs_dvd, cartel, still). Incosistencias (foro/foto)
- Asignar un código de error único a cada cadena de error, para que en frontend se detecte el error por código (numero) y se ofrezca un comportamiento paticular dependiendo el error.
- Resultados de búsqueda a Excel
- Usar notas de loggeo como opción. tal vez en actualiza crear nota por defecto con datos old a nuevos.
- Usar un endpoint para regresar info del token unicamente, util para consultar desde front end y mostarr info acorde. Y Para ver si es un token valido o no
- IMPORTANTE: Al realizar cambios en permisos se debe cambiar el master_key en .env, para que usuarios pierdan acceso y evitar conflictos de permisos.

### Done

- MISC: Limpiar query params y bodies. Sanitize para quitar dobles espacios, etc. (usa el inertar intepretes para probar si jala.)
- checar el estilo de nombres de las entidades generadas deEsto a este_tipo para respetar el nombre en la base de datos.
- todo checar por qué executorservice no detiene la ejecución en una exepción sino la del final. listo
- no funciona pretty-quick en el hook
- el endpoint ("/persona/asocia") funciona al 100, de una lista de personas asocia, pero devuelve una excepción en consola si la relación ya está. Checar??? Ya
- YA. checar lo del onDelete, Se cambia a deletes y se deja softdeletes aparte en DAO.
- Al agregar un titulo con sus personas (y el endpoint de agregar personas), las personas buscan y se ligan: con la relación de trans donde se especifica e rol. y si no está se crea la persona y la relación.
  Nota: Titulos y Personas existen por separado, cada título tiene su lista de relaciones de TRansPersonas, en dicha relación se conectan titulos con personas y se agrega el rol que jugó la persona en cada papel.
- REFACTOR: Todo lo que regrese una lista [] de argumentos es un preService, TODO: agregar el prefijo pre... a estos metodos.
- Al insertar un cd_item, puede ir con un item_digitial, sin importar el tipo (cartel, still), el endpoint genérico puede volarse al final.
- REFACTOR: agregar un index.ts a las entities.
- Terminar inserta de los demás items.
- REFACTOR: actualizaItem, una vez establecido el rol de itemDigital. AHorita estpa ligadísimo a eso. Pero funciona.
- Búsquedas según el tipo de item que recibe, paginada.
- Falta ver lo de los cdItems que se ¿deben? agregar al insertar una personalidad
- DUDA: Los tipos de items que se regresan en /catTipoItem/ son fijos?? Se hace una consulta en la base, pero tal vez sea innecesario.
- Volver a hacer el actualiza de personas como viene en la documentación.
- Separar la ruta item/baja/ en items específicos.
- Refactor del middleware User a utils/JWT.ts
- Refactor middleware/User.ts para asignar correctamente un jwt al res.locals.user (permisos y ids de usuario), y no mocks.
- Login completo usando datos de las bases actuales de django, asigandno un jwt token con permisos y ids de uario.
- Agregar paginado a gets del DAO de LogActionsDAO: No necesario, no habrá ednpoints para consulta de logs
- DUDA: crear endpoints para ver logs de la base de logs? no
- DUDA: loggear también consultas que den error? no, quedan en consola.
- Hacer registro de usuarios
- Llevar lista local de logins válidos, crear un user superusuario de prueba.
- Excepci+on en jwt.ts
- Regresar entidades tipo AuthGroup en getGroup -- refactor grupos y permisos.
- Refactor logActions: quitar el user, pues el user va en el res.
- Hacer el loggeo de logins.
