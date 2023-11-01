import z from 'zod';

export const authCreateArticle = z.object({
    title: z.string({
        required_error: "Title is required",
    }).min(1),

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

  
})