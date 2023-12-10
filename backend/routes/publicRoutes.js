import { Router } from "express";
import { getMenu, getArticle, search } from "../controllers/menuPublicControler.js";

const router = Router();

router.get('/menu', getMenu);
router.get('/article/:id', getArticle);
router.get('/search/:search', search );

export default router;