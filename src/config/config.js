import dotenv from 'dotenv';

dotenv.config();

const {
    SERVER_HOST,
    SERVER_PORT,
    MONGO_URI,
    DB_PATH_CSV
} = process.env;

const config = {
    SERVER_HOST,
    SERVER_PORT,
    MONGO_URI,
    DB_PATH_CSV
}

export default config;