import ArticleModel from "../models/articleModel.js";

    export const getMenu = async (req, res) => {
 
       try {
          const menu = await ArticleModel.find();
 
          if (!menu) return res.status(404).json({
             message: "menu doesn't exist"
          });
 
          res.json(menu);
 
       } catch (error) {
 
          return res.status(500).send({
             message: error.message
          });
       }
 
    }
 
    export const getArticle= async (req, res) => {
       try {
          const id = req.params.id;
          const article = await ArticleModel.findById(id);
 
          if (!article) return res.status(404).json({
             message: "no se encontro el articulo"
          });
 
          res.status(200).json(article);
 
       } catch (error) {
          return res.status(500).send({
             message: error.message
          });
       }
    }
