import * as z from "zod";

const blogsSchema = z.array(
  z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
  })
);

const blogsDetailSchema = z.object({
    title: z.string(),
    content: z.string(),
    description: z.string(),
  })

export { blogsSchema, blogsDetailSchema };
