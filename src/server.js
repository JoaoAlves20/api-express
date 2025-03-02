import express from "express";
import helmet from "helmet";

import config from "./config/serverConfig.js";
import { router } from "./routes/router.js";

const server = express();

server.use(express.json());
server.use(helmet());

server.use(router)

const { port } = config;
server.listen(port, () => console.log(`Server runner in http://localhost:${port}`));