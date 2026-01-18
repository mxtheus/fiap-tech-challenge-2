import { IPostRepository } from '@/repositories/post.repository.interface';

export class SearchPostsUseCase {
    constructor(private readonly postRepository: IPostRepository) { }

    async handler(keyword: string, page: number, limit: number) {
        return this.postRepository.search(keyword, page, limit);
    }
}
