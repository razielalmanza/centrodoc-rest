import { Response, Request } from "express";
import { errorStrings, executeService, ExecutionMetadata } from "../utils";
import * as services from "../services/AuthServices";

export async function login(req: Request, res: Response) {
  const meta: ExecutionMetadata = {
    defaultErrorMessage: errorStrings.ERROR_LOGIN,
    response: res,
    service: services.LoginService,
    preService: {
      input: [req.body.usuario, req.body.password, "pending-ip-nginx"],
      procedure: services.preLogin,
    },
  };
  return await executeService(meta);
}

export async function signup(req: Request, res: Response) {
  const meta: ExecutionMetadata = {
    defaultErrorMessage: errorStrings.ERROR_SIGNUP,
    response: res,
    service: services.signupService,
    preService: {
      input: [req.body],
      procedure: services.preSignup,
    },
  };
  return await executeService(meta);
}
