import { Router } from "express";
import UserControllers from "../controllers/userController.js";
import { authRequired } from "../middlewares/validatorToken.js";
import { validationSchema } from "../middlewares/validatorMiddleware.js";
import { registerAuth, loginAuth } from "../schemas/authUserSchema.js";

const router = Router();

router.post('/register', validationSchema(registerAuth) ,UserControllers.register);
router.post('/login', validationSchema(loginAuth), UserControllers.login);
router.post('/logout', UserControllers.logout);
router.get('/profile', authRequired ,UserControllers.profile);

export default router;