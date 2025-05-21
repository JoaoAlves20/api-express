import dotenv from 'dotenv';
dotenv.config();

export default {
    port: process.env.PORT,
    secret_key: process.env.SECRET_KEY,
    mongodb: {
        uriLocal: process.env.MONGODB_URI_LOCAL
    }
}