import { IPost } from '@/entities/models/post.interface';
import { IPostRepository } from '@/repositories/post.repository.interface';

export class CreatePostUseCase {
    constructor(private readonly postRepository: IPostRepository) { }

    async handler(data: IPost): Promise<void> {
        this.postRepository.create(data);
    }
}
