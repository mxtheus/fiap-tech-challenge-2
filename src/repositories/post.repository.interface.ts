import { IPost } from '@/entities/models/post.interface';

export interface IPostRepository {
    findById(postId: string): Promise<IPost | null>;
    findAll(page: number, limit: number): Promise<IPost[]>;
    search(keyword: string, page: number, limit: number): Promise<IPost[]>;
    create(data: IPost): Promise<IPost>;
    update(id: string, data: IPost): Promise<void>;
    delete(id: string): Promise<void>;
}
