import mongoose from "mongoose";
import dotenv from "dotenv";

import config from "./serverConfig.js"

dotenv.config();
const { uriLocal } = config.mongodb;

export const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI || uriLocal;
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Connect in database");
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}