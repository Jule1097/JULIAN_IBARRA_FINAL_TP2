import express from "express";
import morgan from "morgan";
import productRouterMongo from './routes/productRoutes.js';
import { externalRouter } from './routes/externalRoutes.js';

const server = express();

server.use(morgan("dev"));
server.use(express.json());

server.get("/", (req, res) => {
  res.json({
    message: "Backend Final funcionando OK",
    status: "OK",
  });
});

server.use("/api/v1", productRouterMongo)
server.use("/api/v1", externalRouter);

server.use((req, res) => {
  res.status(404).send(`El endpoint ${req.url} no existe en este servidor.`);
});

export default server;