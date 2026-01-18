import { IPost } from '@/entities/models/post.interface';
import { Model } from 'mongoose';
import { IPostRepository } from '../post.repository.interface';
import { PostModel } from './schemas/post.schema';

export class MongoosePostRepository implements IPostRepository {
    constructor(
        private readonly postModel: Model<IPost> = PostModel,
    ) { }

    async findById(postId: string): Promise<IPost | null> {
        return this.postModel.findById(postId).lean().exec();
    }

    async findAll(page: number, limit: number): Promise<IPost[]> {
        const offset = (page - 1) * limit;

        return this.postModel.find().skip(offset).limit(limit).lean().exec();
    }

    search(keyword: string, page: number, limit: number): Promise<IPost[]> {
        const offset = (page - 1) * limit;

        return this.postModel
            .find({
                $or: [
                    { title: { $regex: keyword, $options: 'i' } },
                    { content: { $regex: keyword, $options: 'i' } }
                ]
            })
            .skip(offset)
            .limit(limit)
            .lean()
            .exec();
    }

    async create(post: IPost): Promise<IPost> {
        const created = new this.postModel(post);
        return await created.save();
    }

    async update(postId: string, data: Partial<IPost>): Promise<void> {
        await this.postModel.updateOne({ _id: postId }, data).exec();
    }

    async delete(postId: string): Promise<void> {
        await this.postModel.deleteOne({ _id: postId }).exec();
    }
}
