import env from "../config";
import authDAO from "../dao/auth/AuthDAO";
import { AuthUser } from "../model";
import {
  ErrorResponse,
  errorStrings,
  infoStrings,
  newPayload,
  newSalt,
  newToken,
  Permisos,
  permisosFromUser,
  ResponseJSON,
  saltInPassword,
  textToPBKDF2,
  User,
  logLogin,
} from "../utils";

export async function createEntity(data) {
  const user: AuthUser = new AuthUser();
  setEntityFields(user, data);
  const salt: string = await newSalt();
  const hashedPass: string = await textToPBKDF2(data.password, salt);
  /** string que va como prefijo de cada contraseña en la base original. */
  const fixed_string: string = `pbkdf2_sha256$${env.rep_cipher}$${salt}$`;
  user.password = fixed_string + hashedPass;
  return user;
}

async function setEntityFields(user: AuthUser, data) {
  user.firstName = data.first_name;
  user.lastName = data.last_name;
  user.isStaff = data.is_staff;
  user.email = data.email;
  user.username = data.username;
  //user.isSuperuser = data.es_superusuario; COMENTADA POR SEGURIDAD, SOLO SI SE OCUPA.
}

/**
 * Con el user, toma su contraseña actual (de la base), extrae su salt,
 * cifra con esa salt el password en texto plano que recibe del request. y compara.
 * @param user entity de tipo AuthUser que se recibe del usuario que intenta loggearse.
 * @param pass texto plano del request.
 * @returns
 */
export async function passwordCorrect(
  user: AuthUser,
  pass_plain: string
): Promise<boolean> {
  const db_pass: string = user.password;
  /** Se obtiene la salt que se usó para cifrar la contraseña. */
  const salt: string = saltInPassword(db_pass);
  /** Cifra la contraseña del request con el salt original. */
  const hashedPass: string = await textToPBKDF2(pass_plain, salt);
  /** string que va como prefijo de cada contraseña en la base original. */
  const fixed_string: string = `pbkdf2_sha256$${env.rep_cipher}$${salt}$`;
  /** Compara la contraseña ya hasheada (desde el texto del request) con la contraseña en base de datos. */
  return fixed_string + hashedPass === db_pass;
}

export async function LoginService(user: AuthUser, pass: string, ip: string) {
  if (!(await passwordCorrect(user, pass)))
    throw new ErrorResponse(errorStrings.ERROR_PASSWORD_INCORRECT, true);
  // token stuff
  const permisos: Permisos[] = await permisosFromUser(user);
  console.log(`Usuario ${user.username} logeado con permisos: ${permisos}`);
  const payload: User = newPayload(user, permisos);
  const token: string = newToken(payload);
  //sconsole.log(token);
  /** Loggea en base de datos el incio de sesión. */
  logLogin(user, ip);
  return { success: true, token: token } as ResponseJSON;
}

/**
 * Verifica que el usuario que se solicita loggear existe.
 * Si existe, regresa su entity, y la contraseña del body.
 * @param usuario string del body del request
 * @param password string del body del request
 */
export async function preLogin(usuario: string, password: string, ip: string) {
  const user: AuthUser = await authDAO.getUserByName(usuario);
  if (!user) throw new ErrorResponse(errorStrings.ERROR_USER_NOT_FOUND, true);
  return [user, password, ip];
}

export async function signupService(user: AuthUser) {
  const inserted: AuthUser = await authDAO.insertUser(user);
  let message: string = inserted.isSuperuser
    ? infoStrings.SUCCESS_SIGNUP_SUPERUSER
    : infoStrings.SUCCESS_SIGNUP;
  if (!inserted) throw new Error();
  return {
    success: true,
    message: message,
    idAffected: String(inserted.id),
  } as ResponseJSON;
}

/**
 * Verifica que el usuario que se solicita registrar existe.
 * Si existe, manda error, si no, regresa el body como entity.
 */
export async function preSignup(data: any) {
  let user: AuthUser = await authDAO.getUserByName(data.username);
  if (user) throw new ErrorResponse(errorStrings.ERROR_USERNAME_USED, true);
  user = await createEntity(data);
  return [user];
}
