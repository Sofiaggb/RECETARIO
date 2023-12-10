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
             message: "article not found"
          });
 
          res.status(200).json(article);
 
       } catch (error) {
          return res.status(500).send({
             message: error.message
          });
       }
    }

    export const search = async (req, res) => {
      const value = req.params.search;
      try {
     
      const search = await ArticleModel.find({"$or": [
         {title:{"$regex": value, "$options": 'i'}},
         {type:{"$regex": value, "$options": 'i'}}
      ]})

      if(search.length == 0) return res.status(404).json({
         message: "Sorry, no matches were found. "
      });

      res.status(200).json(search);

   } catch (error) {
      return res.status(500).send({
         message: error.message
      });
   }

    }

