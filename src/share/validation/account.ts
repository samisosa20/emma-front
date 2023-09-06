import * as z from "zod";

const accountSchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    type_id: z.string(),
    badge_id: z.string(),
    init_amount: z.number(),
    limit: z.number().nullable(),
})

export type accountSchema = z.infer<typeof accountSchema>; 

export { accountSchema }