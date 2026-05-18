import { makeDeleteUserUseCase } from '@/use-cases/factory/make-delete-user-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const deleteUserParamsSchema = z.object({
    id: z.coerce.string()
});

export async function deleteUser(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const { id } = deleteUserParamsSchema.parse(request.params);

    const deleteUserUseCase = makeDeleteUserUseCase();

    await deleteUserUseCase.handler({
        authenticatedUserId: request.user.id,
        targetUserId: id
    });

    return reply.status(204).send();
}