import { UserWithoutPrivileges } from '@/use-cases/errors/user-without-privileges-error';
import { makeCreatePostUseCase } from '@/use-cases/factory/make-create-post-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const createPostBodySchema = z.object({
    title: z.string(),
    content: z.string(),
    isDraft: z.coerce.boolean()
});

export async function create(request: FastifyRequest, reply: FastifyReply) {
    if (request.user.role !== 'teacher') {
        throw new UserWithoutPrivileges();
    }

    const data = createPostBodySchema.parse(request.body);

    const createPostUseCase = makeCreatePostUseCase();

    const post = await createPostUseCase.handler({ author: request.user?.id, ...data });

    return reply.status(201).send(post);
}
