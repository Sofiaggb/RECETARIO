import mongoose, { Schema } from "mongoose";

const userShema = new Schema({
    username: {
        type: String,
        require: true,
        trim: true //quita los espacios en blanco del principio y del final
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true //valor unico
    },
    password: {
        type: String,
        require: true
    },
}, 
{
    timestamps: true  //tiempo en que se creo y actualizo
}
);

const UserModel = mongoose.model('users', userShema);

export default UserModel;