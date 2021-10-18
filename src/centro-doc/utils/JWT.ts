import jwt from "jsonwebtoken";
import env from "../config";
import { AuthUser } from "../model";
import { Permisos, User } from "../utils";

export function newToken(payload): string {
  const token: string = jwt.sign(payload, env.masterKey, {
    expiresIn: env.tokenTimeExpires,
  });
  return "Bearer " + token;
}

export function newPayload(user: AuthUser, permisos: Permisos[]): User {
  const payload: User = {
    usuario: user,
    permisos: permisos,
  };
  return payload;
}

export function getUserFromToken(token: string): any {
  if (token.startsWith("Bearer "))
    token = token.slice(7, token.length).trimLeft();
  return <any>jwt.verify(token, env.masterKey);
}
