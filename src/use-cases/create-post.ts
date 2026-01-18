import { IPost } from '@/entities/models/post.interface';
import { IPostRepository } from '@/repositories/post.repository.interface';

export class CreatePostUseCase {
    constructor(private readonly postRepository: IPostRepository) { }

    async handler(data: IPost): Promise<IPost> {
        return await this.postRepository.create(data);
    }
}
