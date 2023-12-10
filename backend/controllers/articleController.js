import ArticleModel from "../models/articleModel.js";
import { uploadImage, deleteImage, updateImage } from "../libs/cloudinary.js";
import fs from "fs-extra";

const controllers = {

   getMenu: async (req, res) => {

      try {
         const menu = await ArticleModel.find({
            user: req.decoded.id
         }).populate('user');

         if (!menu) return res.status(404).json({
            message: "menu doesn't exist"
         });

         res.json(menu);

      } catch (error) {

         return res.status(500).send({
            message: error.message
         });
      }

   },

   getArticle: async (req, res) => {
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
   },

   search: async (req, res) => {
      const value = req.params.search;
      try {
         const search = await ArticleModel.find({
            $and: [
              { user: req.decoded.id },
              { $or: [
                { title: { $regex: value, $options: 'i' } },
                { type: { $regex: value, $options: 'i' } }
              ]}
            ]
          }).populate('user');
          
          if(search.length == 0) return res.status(404).json({
            message: "Sorry, no matches were found. "
         });
          

          res.status(200).json(search);
   
      } catch (error) {
         return res.status(500).send({
            message : error.message
         });
      }
   },

   save: async (req, res) => {
      try {
         const { title, ingredients, preparation, type } = req.body;

         const article = new ArticleModel({
            title,
            ingredients,
            preparation,
            type,
            user: req.decoded.id
         });

         if (req.files?.image) {
            const result = await uploadImage(req.files.image.tempFilePath);
            article.image = {
               public_id: result.public_id,
               secure_url: result.secure_url
            }

            await fs.unlink(req.files.image.tempFilePath);
         }

         await article.save();

         res.status(200).json(article);

      } catch (error) {
         return res.status(500).send({
            message: error.message
         });
      }
   },

   delete: async (req, res) => {

      try {
         const id = req.params.id;
         const articleDelete = await ArticleModel.findByIdAndDelete(id);

         if (!articleDelete) return res.status(404).json({
            message: "product doesn't exist"
         });

         if (articleDelete.image?.public_id) {
            await deleteImage(articleDelete.image.public_id)
         }

         return res.json(articleDelete);

      } catch (error) {
         res.status(500).json({
            message: error.message
         });
      }

   },

   update: async (req, res) => {
      try {

         const id = req.params.id;
         const { title, ingredients, preparation, type } = req.body;

         const article = await ArticleModel.findById(id);
         console.log(article.image.public_id);

         const updates = {
            title,
            ingredients,
            preparation,
            type
         }

         if (req.files?.image) {

            if (article.image?.public_id) {
               const result = await updateImage(req.files.image.tempFilePath, article.image.public_id);
               updates.image = {
                  public_id: result.public_id,
                  secure_url: result.secure_url
               }
            } else {
               const result = await uploadImage(req.files.image.tempFilePath);
               updates.image = {
                  public_id: result.public_id,
                  secure_url: result.secure_url
               }
            }

            await fs.unlink(req.files.image.tempFilePath);
         }

         const articleUpdate = await ArticleModel.findByIdAndUpdate(id, updates, {
            new: true
         });

         console.log(updates)

         if (!articleUpdate) return res.status(404).json({
            message: " article doesn't exist"
         });


         res.status(200).json(articleUpdate);

      } catch (error) {
         return res.status(500).send({
            message: error.message
         });
      }

   }
}

export default controllers;