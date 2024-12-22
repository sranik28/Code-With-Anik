import { model, Schema } from 'mongoose';
import { TBlog } from './blog.interface';


const BlogPostSchema = new Schema<TBlog>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  isPublished: { type: Boolean, default: true },
});

// Create the Mongoose model
export const Blog = model<TBlog>('Blog', BlogPostSchema);
