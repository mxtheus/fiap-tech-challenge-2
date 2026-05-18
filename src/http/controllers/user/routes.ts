import { verifyUserRole } from '@/http/middlewares/verify-user-role';
import { FastifyInstance } from 'fastify';
import { activateUser, activateUserParamsSchema } from './activate';
import { create, createUserBodySchema } from './create';
import { createUserAsTeacher, createUserAsTeacherBodySchema } from './create-as-teacher';
import { deleteUser, deleteUserParamsSchema } from './delete';
import { findUser, findUserParamsSchema } from './find';
import { listUsers, listUsersQuerySchema } from './list';
import { resetPassword, resetPasswordBodySchema } from './reset-password';
import { signin, userSigninBodySchema } from './signin';
import { updateUser, updateUserBodySchema, updateUserParamsSchema } from './update';

export async function userRoutes(app: FastifyInstance) {
    app.get('/user/:id', {
        schema: {
            tags: ['Users'],
            summary: 'Obter Usuário',
            description: 'Retorna dados de um usuário',
            security: [{ bearerAuth: [] }],
            params: findUserParamsSchema
        }
    }, findUser);

    app.get('/users', {
        schema: {
            tags: ['Users'],
            summary: 'Listar usuários',
            security: [{ bearerAuth: [] }],
            querystring: listUsersQuerySchema
        },
        preHandler: [verifyUserRole('teacher')]
    }, listUsers);

    app.post('/user', {
        schema: {
            tags: ['Users'],
            summary: 'Criar Usuário',
            description: 'Cria um novo usuário no sistema',
            body: createUserBodySchema
        }
    }, create);

    app.post('/admin/user', {
        schema: {
            tags: ['Users'],
            summary: 'Criar usuário como teacher',
            description: 'Permite criar usuários teacher ou student',
            security: [{ bearerAuth: [] }],
            body: createUserAsTeacherBodySchema
        },
        preHandler: [verifyUserRole('teacher')]
    }, createUserAsTeacher);

    app.post('/user/signin', {
        schema: {
            tags: ['Users'],
            summary: 'Login',
            description: 'Obter token JWT a partir de credenciais válidas',
            body: userSigninBodySchema
        }
    }, signin);

    app.put('/user/:id', {
        schema: {
            tags: ['Users'],
            summary: 'Atualizar usuário',
            security: [{ bearerAuth: [] }],
            params: updateUserParamsSchema,
            body: updateUserBodySchema
        },
        preHandler: [verifyUserRole('teacher')]
    }, updateUser);

    app.patch('/user/:id/activate', {
        schema: {
            tags: ['Users'],
            summary: 'Ativar usuário',
            security: [{ bearerAuth: [] }],
            params: activateUserParamsSchema
        },
        preHandler: [verifyUserRole('teacher')]
    }, activateUser);

    app.patch('/user/password', {
        schema: {
            tags: ['Users'],
            summary: 'Redefinir própria senha',
            security: [{ bearerAuth: [] }],
            body: resetPasswordBodySchema
        }
    }, resetPassword);

    app.delete('/user/:id', {
        schema: {
            tags: ['Users'],
            summary: 'Desativar usuário',
            security: [{ bearerAuth: [] }],
            params: deleteUserParamsSchema
        },
        preHandler: [verifyUserRole('teacher')]
    }, deleteUser);
}
