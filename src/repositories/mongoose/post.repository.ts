import { IPost, IPostsFilters } from '@/entities/models/post.interface';
import { Model } from 'mongoose';
import { IPostRepository } from '../post.repository.interface';
import { PostModel } from './schemas/post.schema';

export class MongoosePostRepository implements IPostRepository {
    constructor(
        private readonly postModel: Model<IPost> = PostModel,
    ) { }

    async findById(postId: string, filters?: IPostsFilters): Promise<IPost | null> {
        return await this.postModel
            .findOne({
                _id: postId,
                ...filters
            })
            .populate({
                path: 'author',
                select: 'name'
            })
            .lean()
            .exec();
    }

    async findAll(page: number, limit: number, filters?: IPostsFilters): Promise<IPost[]> {
        const offset = (page - 1) * limit;

        return await this.postModel
            .find(filters)
            .populate({
                path: 'author',
                select: 'name'
            })
            .skip(offset)
            .limit(limit)
            .lean()
            .exec();
    }

    async search(keyword: string, page: number, limit: number, filters?: IPostsFilters): Promise<IPost[]> {
        const offset = (page - 1) * limit;

        return await this.postModel
            .find({
                ...filters,
                $or: [
                    { title: { $regex: keyword, $options: 'i' } },
                    { content: { $regex: keyword, $options: 'i' } }
                ]
            })
            .populate({
                path: 'author',
                select: 'name'
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
