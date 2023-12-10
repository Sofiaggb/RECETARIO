import express from "express";
import morgan from "morgan"; // hacer midelware mas facil
import cors from "cors"; // permiete conectarse a otras rutas externas
import cookieParser from "cookie-parser";//convertir las cookies en un objeto json
// rutas
import privateRouter from "./routes/privateRoutes.js";
import userRouter from "./routes/userRoutes.js";
import publicRouter from "./routes/publicRoutes.js";

import { FRONTEND_URL } from "./config.js";

const app = express();

// midlewares
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}));
// logger es una funcion midleware, obtener informacion antes que llegue a la url
app.use(morgan('dev')) ;//debuelve el metodo y la url a la que se ingreso
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());

//cargar rutas
app.use('/api/',publicRouter);
app.use('/api/',privateRouter);
app.use('/api/', userRouter);

export default app;