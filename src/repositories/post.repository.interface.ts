import { IPost } from '@/entities/models/post.interface';

export interface IPostRepository {
    findById(postId: string): Promise<IPost | null>;
    findAll(limit: number, page: number): Promise<IPost[]>;
    search(keyword: string, limit: number, page: number): Promise<IPost[]>;
    create(data: IPost): Promise<void>;
    update(id: string, data: IPost): Promise<void>;
    delete(id: string): Promise<void>;
}
