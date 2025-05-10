import express from "express";
import helmet from "helmet";
import path from "path";

import config from "./config/serverConfig.js";
import { router } from "./routes/router.js";

const server = express();
const { port } = config;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(helmet());

server.use('/users', router);

export default server;
const fileURL = new URL(`file://${path.resolve(process.argv[1])}`).href;

if (import.meta.url === fileURL) {
    server.listen(port, () => {
        console.log(`Server runner in http://localhost:${port}`);
    })
}