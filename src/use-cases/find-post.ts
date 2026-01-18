import { IPostRepository } from '@/repositories/post.repository.interface';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

export class FindPostUseCase {
    constructor(private readonly postRepository: IPostRepository) { }

    async handler(id: string) {
        const post = await this.postRepository.findById(id);

        if (!post) throw new ResourceNotFoundError();

        return post;
    }
}
