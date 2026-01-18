import { IPost } from '@/entities/models/post.interface';
import { IPostRepository } from '@/repositories/post.repository.interface';

export class SearchPostsUseCase {
    constructor(private readonly postRepository: IPostRepository) { }

    async handler(keyword: string, page: number, limit: number): Promise<IPost[]> {
        return await this.postRepository.search(keyword, page, limit);
    }
}
