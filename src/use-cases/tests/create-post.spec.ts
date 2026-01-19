import { IPostRepository } from '@/repositories/post.repository.interface';
import { describe, expect, it, vi } from 'vitest';
import { CreatePostUseCase } from '../create-post';

describe('CreatePostUseCase', () => {
    it('should create draft post with user-1 as author', async () => {
        const create = vi.fn();

        const repo = {
            create
        } as unknown as IPostRepository;

        const useCase = new CreatePostUseCase(repo);

        await useCase.handler({
            title: 'Post',
            content: 'Content',
            isDraft: false,
            author: 'user-1'
        });

        expect(create).toHaveBeenCalledWith(
            expect.objectContaining({
                author: 'user-1',
                isDraft: false
            })
        );
    });
});
