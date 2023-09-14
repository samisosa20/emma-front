import * as z from 'zod';
import { categorySchema, categoryDetailSchema, categoryCreateSchema, listCategorySchemas } from './category.schema';

type Category = z.infer<typeof categorySchema>;
type CategoryList = z.infer<typeof listCategorySchemas>;
type CategoryDetail = z.infer<typeof categoryDetailSchema>;
type CategoryCreate = z.infer<typeof categoryCreateSchema>;

export type { Category, CategoryDetail, CategoryCreate, CategoryList };