import fileUpload from "express-fileupload"; //guardar imagenes

export const file = fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
})