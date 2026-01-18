import { IPost } from '@/entities/models/post.interface';
import { IPostRepository } from '@/repositories/post.repository.interface';

export class UpdatePostUseCase {
    constructor(private readonly postRepository: IPostRepository) { }

    async handler({
        id,
        title,
        content,
        authorId
    }: IPost): Promise<void> {
        this.postRepository.update(id!, {
            title,
            content,
            authorId
        });
    }
}
