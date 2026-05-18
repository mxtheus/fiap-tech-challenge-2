import { makeActivateUserUseCase } from '@/use-cases/factory/make-activate-user-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const activateUserParamsSchema = z.object({
    id: z.coerce.string()
});

export async function activateUser(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const { id } = activateUserParamsSchema.parse(request.params);

    const activateUserUseCase = makeActivateUserUseCase();

    await activateUserUseCase.handler({
        targetUserId: id
    });

    return reply.status(204).send();
}