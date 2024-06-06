import { Schema, model, models } from 'mongoose';

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Post = models.Post || model('Blog', BlogSchema);

export default Blog;
