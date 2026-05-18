import { makeUpdateUserUseCase } from '@/use-cases/factory/make-update-user-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const updateUserParamsSchema = z.object({
    id: z.coerce.string()
});

export const updateUserBodySchema = z.object({
    name: z.string().optional(),
    email: z.email().toLowerCase().optional(),
    password: z.string().min(6).optional(),
    role: z.enum(['teacher', 'student']).optional(),
    isActive: z.preprocess(
        (value) => {
            if (value === 'true') return true;
            if (value === 'false') return false;

            return value;
        },
        z.boolean().optional()
    )
});

export async function updateUser(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const { id } = updateUserParamsSchema.parse(request.params);

    const data = updateUserBodySchema.parse(request.body);

    const updateUserUseCase = makeUpdateUserUseCase();

    await updateUserUseCase.handler({
        authenticatedUserId: request.user.id,
        targetUserId: id,
        data
    });

    return reply.status(204).send();
}