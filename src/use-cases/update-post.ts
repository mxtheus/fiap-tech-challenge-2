import { IPost } from '@/entities/models/post.interface';
import { IPostRepository } from '@/repositories/post.repository.interface';

export class UpdatePostUseCase {
    constructor(private readonly postRepository: IPostRepository) { }

    async handler(id: string, post: IPost): Promise<void> {
        await this.postRepository.update(id, post);
    }
}
