// initialize configuration for the .env variables
import dotenv from "dotenv";
dotenv.config();

const loggerDb = process.env.LOGGER_ACTIONS_DB;
const env = {
  serverPort: parseInt(process.env.SERVER_PORT) as number,
  limitFileSize: parseInt(process.env.LIMIT_FILE_SIZE) as number,
  tempFileLocation: process.env.TEMP_FILE_LOCATION as string,
  loggerDb: loggerDb === "true",
  rep_cipher: parseInt(process.env.REP_CIPHER) as number,
  masterKey: process.env.MASTER_KEY,
  tokenTimeExpires: process.env.TOKEN_EXPIRES_IN,
  tokenFixed: process.env.TOKEN_FIXED as string,
};

export default env;
