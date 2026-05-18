import { UserWithoutPrivileges } from '@/use-cases/errors/user-without-privileges-error';
import { FastifyRequest } from 'fastify';

export function verifyUserRole(role: 'teacher') {
    return async (request: FastifyRequest) => {
        const user = request.user as any;

        if (user.role !== role) {
            throw new UserWithoutPrivileges();
        }
    };
}