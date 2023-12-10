import { Router } from "express";
import controllers from "../controllers/articleController.js";
import { file } from "../libs/fileUpload.js";
import { authRequired } from "../middlewares/validatorToken.js";
import { validationSchema } from "../middlewares/validatorMiddleware.js";
import { authCreateArticle } from "../schemas/authArticleSchema.js";

const router = Router();

router.get('/your-menu', authRequired, controllers.getMenu);
router.get('/your-article/:id', authRequired, controllers.getArticle);
router.get('/priv-search/:search', authRequired, controllers.search);

router.post('/save',authRequired, validationSchema(authCreateArticle),file, controllers.save);
router.delete('/article/:id', authRequired, controllers.delete);
router.put('/article/:id', authRequired, file, controllers.update);


export default router;
// // querys informacion adicional ejem /query?s=datoExtra
// app.get('/query', (req, res) => {
//     console.log(req.query)
//     res.send(`Hola ${req.query.x}`)

// })


