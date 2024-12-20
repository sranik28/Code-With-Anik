import { model, Schema } from 'mongoose';
import { TBlog } from './blog.interface';


const BlogPostSchema: Schema = new Schema<TBlog>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  isPublished: { type: Boolean, default: true },
});

// Create the Mongoose model
export const Blog = model<TBlog>('Blog', BlogPostSchema);
