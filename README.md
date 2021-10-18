# Centro de Documentación - Back-end

Back-end de la aplicación Centro de Documentación compuesto por servicios RESTful para administrar la base de datos.

## Comenzando 🚀

El back-end de la aplicación está desarrollado en TypeScript con ayuda de Express.js y usando Node.Js.

El proyecto se desarrolla a lo largo del 2021 como renovación del [pasado](https://132.247.164.43/filmo/centroDocumentacion) Centro de Documentación.

En este caso Typescript con ayuda de Express.js para el manejo de peticiones HTTP, reforzando al framework en su robustez y agilidad de desarrollo; ofrece una experiencia mucho más amigable y útil en ambientes de desarrollo, gracias a su naturaleza de un lenguaje fuertemente tipado.

- [Node.js v12.16.2](https://nodejs.org/de/blog/release/v12.16.2/)
- [git](https://git-scm.com/downloads) - Si se desarrolla en ambiente Windows son necesarios estos comandos básicos de shell. Ver [Instalación de Git](https://dgac-conti.atlassian.net/l/c/SeGVPwCY)
- [yarn v1.22.4](https://classic.yarnpkg.com/en/docs/install#windows-stable)

## Instalación

- Instalar Node.js.
- Instalar yarn.
- Clonar el repositorio.

```bash
git@132.247.164.43:centrodoc/centrodoc-rest.git
```

- Instalar proyecto.

```bash
$ yarn install
```

## Ejecución

```bash
$ yarn run
# Modo dev (auto refresh)
$ yarn dev
```

### Variables de entorno

Dentro del archivo **_.env_** se definen las siguientes variables

**_SERVER_PORT_** Número de puerto en donde ejecutar el servicio.
**_LIMIT_FILE_SIZE_** Límite de tamaño en KB para el tama ño de las imágenes  
**_TEMP_FILE_LOCATION_** Ubicación en donde se alamcenarán lso archivos recibidos
**_LOGGER_ACTIONS_DB_** Booleano para activar / desactivar el registro de acciones de base de datos.
**_REP_CIPHER_** Numero de repetciciones apra empatar el cifrdo anterior, debería ser siempre 12000
**_TOKEN_FIXED_** Variable para asignar un token fijo, para desarrollo
**_TOKEN_EXPIRES_IN_** Variable para asignar el tiempo de expiración, ejemplo 3000h
**_MASTER_KEY_** Variable con la llave que firman los tokens que se producen al iniciar sesión

## Estructura del proyecto 📂

- 📂 **docs**
  Contiene los varios documentos donde se detalla el avance del progreso y futuros documentos que proporcionen información para la plataforma.

- 📂 **src/centro-doc/config**
  Contiene las variables de entorno asignadas a variables exportadas para el uso durante el proyecto.

- 📂 **src/centro-doc/controller**
  Contiene los controladores, un directorio por cada tipo de entidad.

- 📂 **src/centro-doc/dao**
  Contiene las clases con las peticiones a la base, un directorio por cada tipo de entidad.

- 📂 **src/centro-doc/middleware**
  Contiene los Middlewares.

- 📂 **src/centro-doc/model**
  Contiene laas clases que modelan las entidades, emptando el modelo de la base de datos.

- 📂 **src/centro-doc/routes**
  Contiene el mapeo de rutas para los endpoints con su respectivo controlador.

- 📂 **src/centro-doc/services**
  Contiene los servicios, un directorio por cada tipo de entidad.

- 📂 **src/utils**
  Contiene archivos con diversas funcionalidades, como JWT, cifrado, ServiceExecutor y funciones misceláneas.

## Despliegue

Pendiente.

---

## Autores ✒️

- **Raziel Almanza Ibarra** - <razielalmanza@ciencias.unam.mx>
