import { IPost } from '@/entities/models/post.interface';
import { model, Model, Schema } from 'mongoose';

export type PostDocument = IPost;

const PostSchema = new Schema<IPost>(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        isDraft: { type: Boolean, default: false },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export const PostModel: Model<IPost> = model<IPost>('Post', PostSchema);
