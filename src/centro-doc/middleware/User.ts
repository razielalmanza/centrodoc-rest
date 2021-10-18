import { Response, Request, NextFunction } from "express";
import env from "../config";
import { errorStrings, getUserFromToken, ResponseJSON, User } from "../utils";
/**
 * Mock function that inserts data into the res.locals.user
 * Eventually will be based on the actual token and info from the django DBs.
 */

export function userData(req: Request, res: Response, next: NextFunction) {
  let user: User;
  try {
    user = getUserFromToken(req.headers.authorization || env.tokenFixed);
    res.locals.user = user;
    //console.log(res.locals.user);
    next();
  } catch {
    res.status(403);
    res.send({
      success: false,
      message: errorStrings.ERROR_TOKEN,
    } as ResponseJSON);
    throw new Error();
  }
}
