import { Schema, model, models, Model } from 'mongoose';

export interface IPost {
  _id: string;
  title: string;
  content: string;
  slug: string;
  excerpt: string;
  author: {
    name: string;
    avatar?: string;
  };
  coverImage?: string;
  status: 'draft' | 'published';
  categories: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  readTime?: string;
  description?: string;
}

const PostSchema = new Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  author: {
    name: { type: String, required: true },
    avatar: { type: String },
  },
  coverImage: { type: String },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  categories: [{ type: String }],
  tags: [{ type: String }],
  readTime: { type: String },
  description: { type: String },
}, {
  timestamps: true,
});

export const Post: Model<IPost> = models.Post || model<IPost>('Post', PostSchema); 