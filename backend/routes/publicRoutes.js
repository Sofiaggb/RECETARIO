import { Router } from "express";
import { getMenu, getArticle } from "../controllers/menuPublicControler.js";

const router = Router();

router.get('/menu', getMenu);
router.get('/article/:id', getArticle);

export default router;