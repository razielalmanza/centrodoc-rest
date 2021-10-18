import { Request, Response, NextFunction } from "express";
import {
  Permisos,
  errorStrings,
  ResponseJSON,
  mapPermissionsUrls,
} from "../utils";

/** https://stackoverflow.com/a/32118818 */
function trimPath(url: string): string {
  return url.split("?").shift();
}
export function checkPermissions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  /** Construimos string de formato : 'post/still' sin queries */
  const mapString: string = req.method.toLowerCase() + trimPath(req.url);
  //console.log(mapString);
  const userPermissions: Permisos[] = res.locals.user.permisos;
  const required: Permisos[] = mapPermissionsUrls[mapString];
  /** Si no encuentra un mapeo correcto, probablemnte no necesite permisos y se da el acceso.  */
  if (!required) {
    next();
    return;
  }

  let count = 0;
  for (const permission of userPermissions) {
    if (required.includes(permission)) count++;
  }
  if (required.length === count) {
    next();
  } else {
    res.status(403);
    res.send({
      success: false,
      message: errorStrings.ERROR_NO_PERMISSIONS,
    } as ResponseJSON);
  }
}
