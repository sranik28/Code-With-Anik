import { z } from 'zod';
import auth from '../../middlewares/auth';

const BlogValidationSchema = z.object({
  body: z.object({
    title: z.string().nonempty('Title is required'),
    content: z.string().nonempty('Content is required'),
    author: z.string().optional(),
    isPublished: z.boolean().optional().default(true),
  }),
});

export const BlogValidation = {
    BlogValidationSchema,
};
