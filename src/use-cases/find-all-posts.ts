import { IPost } from '@/entities/models/post.interface';
import { IPostRepository } from '@/repositories/post.repository.interface';

export class FindAllPostsUseCase {
    constructor(private readonly postRepository: IPostRepository) { }

    async handler(page: number, limit: number): Promise<IPost[]> {
        return await this.postRepository.findAll(page, limit);
    }
}
