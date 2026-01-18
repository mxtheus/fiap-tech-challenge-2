import { IPost } from '@/entities/models/post.interface';
import { IPostRepository } from '@/repositories/post.repository.interface';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

export class FindPostUseCase {
    constructor(private readonly postRepository: IPostRepository) { }

    async handler(id: string): Promise<IPost> {
        const post = await this.postRepository.findById(id);

        if (!post) throw new ResourceNotFoundError();

        return post;
    }
}
