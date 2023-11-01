import z from 'zod';

export const registerAuth = z.object({
    username: z.string({
        required_error: 'username is required'
    }),

    email: z.string({
        required_error: 'email is required'
    }).email({
        message: "invalid email"
    }),

    password: z.string({
        required_error: 'password is required',
    }).min(6, {
        message: 'Password must be at least 6 characters long.'
    })

});

export const loginAuth = z.object({
    email: z.string({
        required_error: 'email is required'
    }).email({
        message: "Invalid email"
    }),

    password: z.string({
        required_error: 'password is required',
    }).min(6, {
        message: 'Password must be at least 6 characters long.'
    })
})