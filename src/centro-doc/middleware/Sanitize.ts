import { Response, Request, NextFunction } from "express";

function cleanQueryParams(params: any) {
  for (const p of Object.keys(params)) {
    //console.log(typeof params[p]);
    //console.log(p);
    if (!params[p]) continue; // params[p] == null -> {propiedad: null}
    if (typeof params[p] == "string") {
      // " ejemplo  uno " -> "ejemplo uno"
      let s: string = params[p].trim();
      s = s.replace(/\s+/g, " ");
      params[p] = s;
    }
    if (typeof params[p] == "object") {
      // si hay un objeto, se manda 'recursivamente'.
      cleanQueryParams(params[p]);
    }
  }
}

export function sanitize(req: Request, res: Response, next: NextFunction) {
  cleanQueryParams(req.query);
  cleanQueryParams(req.body);
  //console.log(req.query);
  next();
}
