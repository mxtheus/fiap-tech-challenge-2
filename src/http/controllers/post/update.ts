import { UserWithoutPrivileges } from '@/use-cases/errors/user-without-privileges-error';
import { makeUpdatePostUseCase } from '@/use-cases/factory/make-update-post-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function update(request: FastifyRequest, reply: FastifyReply) {
    if (request.user.role !== 'teacher') {
        throw new UserWithoutPrivileges();
    }

    const paramsSchema = z.object({
        id: z.coerce.string()
    });

    const bodySchema = z.object({
        title: z.string(),
        content: z.string(),
        isDraft: z.coerce.boolean()
    });

    const { id } = paramsSchema.parse(request.params);

    const post = bodySchema.parse(request.body);

    const updatePostUseCase = makeUpdatePostUseCase();

    await updatePostUseCase.handler(id, post);

    return reply.status(204).send();
}
