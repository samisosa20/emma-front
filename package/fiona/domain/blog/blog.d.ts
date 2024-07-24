import * as z from 'zod';
import { blogsSchema, blogsDetailSchema } from './blog.schema';

type Blogs = z.infer<typeof blogsSchema>;
type BlogDetail = z.infer<typeof blogsDetailSchema>;

export type { Blogs, BlogDetail };