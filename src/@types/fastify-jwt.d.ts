import { UserRole } from '@/entities/models/user.interface';
import '@fastify/jwt';

declare module '@fastify/jwt' {
    interface FastifyJWT {
        user: {
            id: string;
            email: string;
            role: UserRole;
        };
    }
}
