import jwt from "jsonwebtoken";
import 'dotenv/config';

export const authRequired = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ error: 'Token is required' });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'invalid Token' });

        req.decoded = decoded;

        next();

    });
} 