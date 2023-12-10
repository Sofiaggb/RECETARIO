import 'dotenv/config'

export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173"

export const PORT = process.env.PORT || 2800

// db
export const MONGODB_URI = process.env.MONGODB_URI

// imagenes
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET

// token
export const TOKEN_SECRET = process.env.TOKEN_SECRET
