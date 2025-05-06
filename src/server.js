import express from "express";
import helmet from "helmet";

import config from "./config/serverConfig.js";
import { router } from "./routes/router.js";

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(helmet());

server.use('/users', router);

const { port } = config;
server.listen(port, () => console.log(`Server runner in http://localhost:${port}`));