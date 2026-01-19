import { UserWithoutPrivileges } from '@/use-cases/errors/user-without-privileges-error';
import { makeDeletePostUseCase } from '@/use-cases/factory/make-delete-post-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const deletePostParamsSchema = z.object({
    id: z.coerce.string()
});

export async function deletePost(request: FastifyRequest, reply: FastifyReply) {
    if (request.user.role !== 'teacher') {
        throw new UserWithoutPrivileges();
    }

    const { id } = deletePostParamsSchema.parse(request.params);

    const deletePostUseCase = makeDeletePostUseCase();

    await deletePostUseCase.handler(id);

    return reply.status(204).send();
}
