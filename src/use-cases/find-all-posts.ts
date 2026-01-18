import { IPost } from '@/entities/models/post.interface';
import { UserRole } from '@/entities/models/user.interface';
import { IPostRepository } from '@/repositories/post.repository.interface';

export class FindAllPostsUseCase {
    constructor(private readonly postRepository: IPostRepository) { }

    async handler(role: UserRole, page: number, limit: number): Promise<IPost[]> {
        const filters = role === 'teacher' ? {} : { isDraft: false };

        return await this.postRepository.findAll(page, limit, filters);
    }
}
