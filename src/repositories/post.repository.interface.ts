import { IPost, IPostsFilters } from '@/entities/models/post.interface';

export interface IPostRepository {
    findById(postId: string, filters?: IPostsFilters): Promise<IPost | null>;
    findAll(page: number, limit: number, filters?: IPostsFilters): Promise<IPost[]>;
    search(keyword: string, page: number, limit: number, filters?: IPostsFilters): Promise<IPost[]>;
    create(data: IPost): Promise<IPost>;
    update(id: string, data: IPost): Promise<void>;
    delete(id: string): Promise<void>;
}
