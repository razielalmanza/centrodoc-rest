import { createConnection } from "typeorm";
import env from "./centro-doc/config";
import authDAO from "./centro-doc/dao/auth/AuthDAO";
import { AuthUser } from "./centro-doc/model";
import { app } from "./setup";

const port: number = env.serverPort || 3000;

app.listen(port, async () => {
  console.log(`Server started at http://localhost:${port}`);
  await createConnection();
  console.log("Created db connection");
  //await testCreateSuperusuario();
});
