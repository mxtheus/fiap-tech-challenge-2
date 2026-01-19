import { FastifyInstance } from 'fastify';
import { create, createUserBodySchema } from './create';
import { findUser, findUserParamsSchema } from './find';
import { signin, userSigninBodySchema } from './signin';

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

    app.post('/user', {
        schema: {
            tags: ['Users'],
            summary: 'Criar Usuário',
            description: 'Cria um novo usuário no sistema',
            body: createUserBodySchema
        }
    }, create);

    app.post('/user/signin', {
        schema: {
            tags: ['Users'],
            summary: 'Login',
            description: 'Obter token JWT a partir de credenciais válidas',
            body: userSigninBodySchema
        }
    }, signin);

}
