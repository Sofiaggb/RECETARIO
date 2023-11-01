import mongoose,{Schema} from "mongoose";

const ArticleSchema = new Schema({
    title: {
        type: String,
        require: true,
        trim: true //quita los espacios en blanco del principio y del final
    },
    ingredients:  {
        type: String,
        require: true,
        trim: true 
    },
    preparation:  {
        type: String,
        require: true,
        trim: true 
    },
    type:  {
        type: String,
        require: true,
        trim: true 
    },
    date:{ 
        type: Date,
         default: Date.now
        },
    image:{
        public_id: String,
        secure_url: String
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users',
        require: true
    }
});

const ArticleModel = mongoose.model('menus', ArticleSchema);

export default ArticleModel;