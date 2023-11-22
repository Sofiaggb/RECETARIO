import z from 'zod';


export const authCreateArticle = z.any({
    title: z.string({
        required_error: "Title is required",
    }).min(1, {
        message: 'Title must be at least 4 characters long.'
    }),

    ingredients: z.string({
        required_error: "Ingredient list is required"
    }),

    preparation: z.string({
        required_error: "Preparation instructions are required"
    }),

    type: z.string({
        required_error: "Type of food is required"
    }),

    date: z.string().datetime().optional(), 

    image :z.any().refine((value) => value instanceof Blob || value instanceof File, {
        message: "Image must be a Blob or a File",
      }).optional()
    // image :z.any().optional()
  
})