import { IPost } from '@/entities/models/post.interface';
import { UserRole } from '@/entities/models/user.interface';
import { IPostRepository } from '@/repositories/post.repository.interface';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

export class FindPostUseCase {
    constructor(private readonly postRepository: IPostRepository) { }

    async handler(role: UserRole, id: string): Promise<IPost> {
        const filters = role === 'teacher' ? {} : { isDraft: false };

        const post = await this.postRepository.findById(id, filters);

        if (!post) throw new ResourceNotFoundError();

        return post;
    }
}
