import server from "./src/server.js";
import config from './src/config/config.js';
import MongooseConnection from "./src/database/mongo.cnx.js";

const runServer = async () => {
    try {
        const mongoConnection = new MongooseConnection();
        await mongoConnection.connect();
    } catch (error) {
        console.log("No se pudo conectar:", error.message)
    }

    server.listen(config.SERVER_PORT, config.SERVER_HOST, () => {
        console.log(`Servidor escuchando en http://${config.SERVER_HOST}:${config.SERVER_PORT}`);
    })    
}

runServer();