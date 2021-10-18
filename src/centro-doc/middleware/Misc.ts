import { ResponseJSON } from "../utils";
import { Response, Request, NextFunction } from "express";

export function insert(req: Request, res: Response, next: NextFunction) {
  if (!req.body.itemDigital)
    console.log("Se ha recibido un cdItem para insertar sin item_digital.");
  if (!req.body.itemHijo)
    res.send({
      success: false,
      message:
        "No has envíado un item hijo (cartel, stills, etc) en el campo itemHijo del body.",
    } as ResponseJSON);
  next();
}
