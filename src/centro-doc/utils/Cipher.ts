import pbkdf2 from "pbkdf2";
import crypto from "crypto";
import env from "../config";

/**
 * Usamos 8 bytes preferentemente, pues a hexadecimal obtenemos salt de 12 caracteres,
 * manteniendo el formato de los demás passwords heredados por django.
 * @returns salt
 */
export async function newSalt(): Promise<string> {
  const bytesLength: number = 8;
  return crypto.randomBytes(bytesLength).toString("base64");
}

/**
 * The password attribute of a User object is a string in this format:
 *  <algorithm>$<iterations>$<salt>$<hash>
 * more: https://docs.djangoproject.com/en/3.1/topics/auth/passwords/
 */
export function saltInPassword(password: string): string {
  //console.log(password);
  const array: string[] = password.split("$");
  //console.log(array);
  return array[2];
}

/**
 * Se cifra el texto plano, al algoritmo pbkdf2 con digest 'sha256'.
 * Se usa keylen = 32, pues en pruebas, se averiguó era el correcto.
 * usa el numero de repeticiones setteadas en .env.
 * Toma el buffer cifrado y lo regresa a base64.
 */
export async function textToPBKDF2(
  plainTextPass: string,
  salt: string
): Promise<string> {
  const keylen: number = 32;
  const passBuffer: Buffer = pbkdf2.pbkdf2Sync(
    plainTextPass,
    salt,
    env.rep_cipher,
    keylen,
    "sha256"
  );
  const passHashed: string = passBuffer.toString("base64");
  return passHashed;
}
