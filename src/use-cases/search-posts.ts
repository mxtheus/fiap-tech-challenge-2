import { IPost } from '@/entities/models/post.interface';
import { UserRole } from '@/entities/models/user.interface';
import { IPostRepository } from '@/repositories/post.repository.interface';

export class SearchPostsUseCase {
    constructor(private readonly postRepository: IPostRepository) { }

    async handler(role: UserRole, keyword: string, page: number, limit: number): Promise<IPost[]> {
        const filters = role === 'teacher' ? {} : { isDraft: false };

        return await this.postRepository.search(keyword, page, limit, filters);
    }
}
