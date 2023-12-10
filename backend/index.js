import mongoose from "mongoose";
import app from "./app.js";

import { PORT, MONGODB_URI } from "./config.js";

const url = MONGODB_URI;

 const connection = async () => {
    try {
        await mongoose.connect(url);

        app.listen(PORT, () =>
            console.log('server on port ' + PORT)
        )
    } catch (error) {
        console.error(error);
    }
}

connection();
