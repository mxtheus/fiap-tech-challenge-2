import { IPostRepository } from '@/repositories/post.repository.interface';
import { describe, expect, it, vi } from 'vitest';
import { FindPostUseCase } from '../find-post';
import { SearchPostsUseCase } from '../search-posts';

const postRepository: IPostRepository = {
    findAll: vi.fn(),
    search: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn()
};

describe('SearchPostsUseCase', () => {
    it('should apply isDraft=false for students', async () => {
        const useCase = new SearchPostsUseCase(postRepository);

        await useCase.handler('student', 'aula', 1, 10);

        expect(postRepository.search).toHaveBeenCalledWith(
            'aula',
            1,
            10,
            { isDraft: false }
        );
    });

    it('should not apply filters for teachers', async () => {
        const useCase = new SearchPostsUseCase(postRepository);

        await useCase.handler('teacher', 'aula', 1, 10);

        expect(postRepository.search).toHaveBeenCalledWith(
            'aula',
            1,
            10,
            {}
        );
    });
});

describe('FindPostUseCase', () => {
    it('should throw error when post is not found', async () => {
        postRepository.findById = vi.fn().mockResolvedValue(null);

        const useCase = new FindPostUseCase(postRepository);

        await expect(
            useCase.handler('student', 'post-id')
        ).rejects.toThrow('Resource not found');
    });

    it('should apply isDraft=false when student fetches post by id', async () => {
        postRepository.findById = vi.fn().mockResolvedValue({
            id: 'post-id',
            title: 'Post',
            content: 'Conteúdo',
            isDraft: false,
            author: 'author-id'
        } as any);

        const useCase = new FindPostUseCase(postRepository);

        await useCase.handler('student', 'post-id');

        expect(postRepository.findById).toHaveBeenCalledWith(
            'post-id',
            { isDraft: false }
        );
    });

    it('should not apply filters when teacher fetches post by id', async () => {
        postRepository.findById = vi.fn().mockResolvedValue({
            id: 'post-id',
            title: 'Post',
            content: 'Conteúdo',
            isDraft: false,
            author: 'author-id'
        } as any);

        const useCase = new FindPostUseCase(postRepository);

        await useCase.handler('teacher', 'post-id');

        expect(postRepository.findById).toHaveBeenCalledWith(
            'post-id',
            {}
        );
    });
});