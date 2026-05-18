import { makeResetPasswordUseCase } from '@/use-cases/factory/make-reset-password-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const resetPasswordBodySchema = z.object({
    currentPassword: z.string(),
    newPassword: z.string().min(6)
});

export async function resetPassword(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const data = resetPasswordBodySchema.parse(request.body);

    const resetPasswordUseCase = makeResetPasswordUseCase();

    await resetPasswordUseCase.handler({
        userId: request.user.id,
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
    });

    return reply.status(204).send();
}