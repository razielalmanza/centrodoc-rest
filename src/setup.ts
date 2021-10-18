import express from "express";
import routes from "./centro-doc/routes";
import cors from "cors";
const app = express();

// Configurations for the JSON parsed objects
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("trust proxy", true); // IP
app.use(cors());
app.use("/", routes);
console.log("Initialazing ");

export { app };
