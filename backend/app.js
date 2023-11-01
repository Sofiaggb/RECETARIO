import express from "express";
import morgan from "morgan"; // hacer midelware mas facil
import cors from "cors"; // permiete conectarse a otras rutas externas
// import bodyParser from "body-parser";// recibir peticiones, lo convierte en un objeto utilizable
import cookieParser from "cookie-parser";//convertir las cookies en un objeto json
// rutas
import privateRouter from "./routes/privateRoutes.js";
import userRouter from "./routes/userRoutes.js";
import publicRouter from "./routes/publicRoutes.js";

const app = express();

// midlewares
app.use(cors({
    origin: 'http://localhost:5173',
}));
// logger es una funcion midleware, obtener informacion antes que llegue a la url
app.use(morgan('dev')) ;//debuelve el metodo y la url a la que se ingreso
// app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());

// app.use(bodyParser.urlencoded({ extended: false }));  // cargar bodyParser 
// app.use(bodyParser.json());  //convertir cualquier peticion en un objeto json

//cargar rutas
app.use('/api/',publicRouter);
app.use('/api/',privateRouter);
app.use('/api/', userRouter);


export default app;