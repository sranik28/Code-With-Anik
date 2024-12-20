import { model, Schema } from 'mongoose';
import { Blog } from './blog.interface';

const BlogPostSchema: Schema = new Schema<Blog>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  isPublished: { type: Boolean, default: true },
});

// Create the Mongoose model
const Blog = model<Blog>('Blog', BlogPostSchema);
