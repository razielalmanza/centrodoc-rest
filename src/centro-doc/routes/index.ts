import { Router } from "express";
import * as titulosController from "../controller/titulos/TitulosController";
import * as personaController from "../controller/personas/PersonasController";
import * as personalidadController from "../controller/person/PersonalidadController";
import * as interpController from "../controller/interp/InterpController";
import * as itemController from "../controller/item/ItemController";
import { catValRequest, tipoItem } from "../controller/values/valuesController";
import * as middle from "../middleware/";
import multer, { Multer } from "multer";
import { login, signup } from "../controller/AuthController";

const multerMiddle: Multer = multer();
const routes: Router = Router();
/** IMPRTANTE: Orden importa */
routes.post('/login', login);
routes.post('/signup', signup);
routes.use('/', [middle.sanitize, middle.userData, middle.checkPermissions]);
//routes.get('/test', (req, res) => console.log(req.headers['x-forwarded-for'], req.socket.remoteAddress, req.ip));

/** Titulos endpoints */
function titulosRoutes() {
  routes.get('/titulo', titulosController.leeTitulo);
  routes.get('/titulo/busca', titulosController.buscaTitulos);
  routes.put('/titulo', titulosController.insertaTitulos);
  routes.patch('/titulo', titulosController.actualizaTitulo);
  routes.get('/titulo/asociadosToPersona', titulosController.asocidados);
  routes.post('/titulo/asociaItem', titulosController.asociaToItem);
  routes.post('/titulo/desasociaItem', titulosController.desasociaToItem);
};

function personasRoutes() {
  routes.get('/persona', personaController.leePersona);
  routes.get('/persona/busca', personaController.buscaPersona);
  routes.put('/persona', personaController.insertaPersona);
  routes.patch('/persona', personaController.actualizaPersona);
  routes.get('/persona/asociadasToTitulo', personaController.asocidados);
  routes.post('/persona/asocia', personaController.asociaToTitulo);
  routes.post('/persona/desasocia', personaController.desasociaToTitulo);
};

function personalidadesRoutes() {
  routes.get('/person', personalidadController.leePerson);
  routes.get('/person/busca', personalidadController.buscaPerson);
  routes.put('/person', personalidadController.insertaPersonalidad);
  routes.patch('/person', personalidadController.actualizaPersonalidad);
};

function interpRoutes() {
  routes.get('/interprete', interpController.leeInterp);
  routes.get('/interprete/busca', interpController.buscaInterp);
  routes.put('/interprete', interpController.insertaInterp);
  routes.patch('/interprete', interpController.actualizaInterp);
  routes.post('/interprete/asocia', interpController.asociaToItem);
  routes.post('/interprete/desasocia', interpController.desasociaToItem);
};

function catValuesRoutes() {
  /**
   * Este pedazo de código puede ser minimazo al usar solo un endpoint, y en el body recibir el tipo de request.
   */
  routes.get('/catTipoItem', tipoItem);
  routes.route('/catCartelTamanio').get(catValRequest("catCartelTamanio"));
  routes.route('/catFotoTamanio').get(catValRequest("catFotoTamanio"));
  routes.route('/catFotoColor').get(catValRequest("catFotoColor"));
  routes.route('/catVideoExtras').get(catValRequest("catVideoExtras"));
  routes.route('/catVideoFormato').get(catValRequest("catVideoFormato"));
  routes.route('/catVideoPantalla').get(catValRequest("catVideoPantalla"));
};

function itemDigitalRoutes(){
  routes.get('/item/proxy', itemController.leeProxy);
  routes.get('/item/img', itemController.leeImagen);
  routes.post('/item/upload', [multerMiddle.single('file')], itemController.uploadImagen);
};

function leeItem(){
  routes.route('/still').get(itemController.leeItem("still")); // Regresa item con stills
  routes.route('/fomo').get(itemController.leeItem("fomo")); // ...
  routes.route('/foro').get(itemController.leeItem("foro")); // 
  routes.route('/cartel').get(itemController.leeItem("cartel")); // 
  routes.route('/vhsdvd').get(itemController.leeItem("vhs_dvd")); // 
};

function insertaItem(){
  /** Nota: Se le aplica a todos el middleware insert() */
  routes.route('/item').put([middle.insert], itemController.insertaItem("digital")); // INSERTA item con cd_item_digital sin hijo.
  routes.route('/still').put([middle.insert], itemController.insertaItem("still")); // INSERTA item con stills y un posible item digital.
  routes.route('/fomo').put([middle.insert], itemController.insertaItem("fomo")); // ...
  routes.route('/foro').put([middle.insert], itemController.insertaItem("foro")); // 
  routes.route('/cartel').put([middle.insert], itemController.insertaItem("cartel")); // 
  routes.route('/vhsdvd').put([middle.insert], itemController.insertaItem("vhs_dvd")); // 
};

function actualizaItem(){
  routes.route('/still').patch(itemController.actualizaItem("still"));
  routes.route('/fomo').patch(itemController.actualizaItem("fomo"));
  routes.route('/foro').patch(itemController.actualizaItem("foro"));
  routes.route('/cartel').patch(itemController.actualizaItem("cartel"));
  routes.route('/vhsdvd').patch(itemController.actualizaItem("vhs_dvd"));
}


function buscaItem(){
  routes.route('/still/busca').get(itemController.buscaItem("still"));
  routes.route('/fomo/busca').get(itemController.buscaItem("fomo"));
  routes.route('/foro/busca').get(itemController.buscaItem("foro"));
  routes.route('/cartel/busca').get(itemController.buscaItem("cartel"));
  routes.route('/vhsdvd/busca').get(itemController.buscaItem("vhs_dvd"));
}

function bajaItem(){
  routes.post('/still/baja', itemController.bajaItem);
  routes.post('/fomo/baja', itemController.bajaItem);
  routes.post('/foro/baja', itemController.bajaItem);
  routes.post('/cartel/baja', itemController.bajaItem);
  routes.post('/vhsdvd/baja', itemController.bajaItem);
};


titulosRoutes();
personasRoutes();
personalidadesRoutes();
interpRoutes();
catValuesRoutes();
itemDigitalRoutes();
leeItem();
insertaItem();
actualizaItem();
buscaItem();
bajaItem();
export default routes;
