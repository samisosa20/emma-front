import * as z from "zod";

const loginSchema = z.object({
    email: z.string().email('Formato incorrecto'),
    password: z.string(),
})

const authSchema = z.object({
    email: z.string().email('Formato incorrecto'),
    name: z.string(),
    currency: z.number(),
    transfer_id: z.number(),
    token: z.string(),
    error: z.boolean(),
    message: z.string(),
    accounts_type: z.array(z.object({
        value: z.string(),
        label: z.string(),
    })),
    periods: z.array(z.object({
        value: z.string(),
        label: z.string(),
    })),
    currencies: z.array(z.object({
        value: z.string(),
        label: z.string(),
    })),
    groups_category: z.array(z.object({
        value: z.string(),
        label: z.string(),
    }))
})

export { loginSchema, authSchema }