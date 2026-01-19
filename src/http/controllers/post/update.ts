import { UserWithoutPrivileges } from '@/use-cases/errors/user-without-privileges-error';
import { makeUpdatePostUseCase } from '@/use-cases/factory/make-update-post-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const updatePostParamsSchema = z.object({
    id: z.coerce.string()
});

export const updatePostBodySchema = z.object({
    title: z.string(),
    content: z.string(),
    isDraft: z.coerce.boolean()
});

export async function update(request: FastifyRequest, reply: FastifyReply) {
    if (request.user.role !== 'teacher') {
        throw new UserWithoutPrivileges();
    }

    const { id } = updatePostParamsSchema.parse(request.params);

    const post = updatePostBodySchema.parse(request.body);

    const updatePostUseCase = makeUpdatePostUseCase();

    await updatePostUseCase.handler(id, post);

    return reply.status(204).send();
}
