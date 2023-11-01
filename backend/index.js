import mongoose from "mongoose";
import app from "./app.js";
import 'dotenv/config'
// mogobd atlas es la opcion en la nube
const port = 2800;
const url = process.env.MONGODB_URI;

 const connection = async () => {
    try {
        await mongoose.connect(url);

        app.listen(port, () =>
            console.log('server on port ' + port)
        )
    } catch (error) {
        console.error(error);
    }
}

connection();
