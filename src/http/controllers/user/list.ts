import { makeListUsersUseCase } from '@/use-cases/factory/make-list-users-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const listUsersQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(10),
    role: z.enum(['teacher', 'student']).optional(),
    isActive: z.preprocess(
        (value) => {
            if (value === 'true') return true;
            if (value === 'false') return false;

            return value;
        },
        z.boolean().optional()
    ).optional(),
    search: z.string().trim().optional()
});

export async function listUsers(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const { page, limit, role, isActive, search } = listUsersQuerySchema.parse(request.query);

    const listUsersUseCase = makeListUsersUseCase();

    const users = await listUsersUseCase.handler(
        page,
        limit,
        role,
        isActive,
        search
    );

    return reply.status(200).send(users);
}