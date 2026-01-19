import { FastifyInstance } from 'fastify'
import { create, createPostBodySchema } from './create'
import { deletePost, deletePostParamsSchema } from './delete'
import { findPost, findPostParamsSchema } from './find'
import { findAllPosts, findAllPostsQuerySchema } from './find-all-posts'
import { search, searchPostQuerySchema } from './search'
import { update, updatePostBodySchema, updatePostParamsSchema } from './update'

export async function postsRoutes(app: FastifyInstance) {
    app.get('/posts', {
        schema: {
            tags: ['Posts'],
            summary: 'Lista posts',
            description: 'Retorna posts conforme o perfil do usuário',
            security: [{ bearerAuth: [] }],
            querystring: findAllPostsQuerySchema
        }
    }, findAllPosts);

    app.get('/posts/:id', {
        schema: {
            tags: ['Posts'],
            summary: 'Obter post',
            description: 'Retorna dados de um post',
            security: [{ bearerAuth: [] }],
            params: findPostParamsSchema
        }
    }, findPost);

    app.post('/posts', {
        schema: {
            tags: ['Posts'],
            summary: 'Criar post',
            description: 'Cria um novo post no sistema',
            security: [{ bearerAuth: [] }],
            body: createPostBodySchema
        }
    }, create);

    app.put('/posts/:id', {
        schema: {
            tags: ['Posts'],
            summary: 'Atualizar post',
            description: 'Atualiza dados de um post',
            security: [{ bearerAuth: [] }],
            body: updatePostBodySchema,
            params: updatePostParamsSchema
        }
    }, update);

    app.delete('/posts/:id', {
        schema: {
            tags: ['Posts'],
            summary: 'Apagar post',
            description: 'Apaga um post',
            security: [{ bearerAuth: [] }],
            params: deletePostParamsSchema
        }
    }, deletePost);

    app.get('/posts/search', {
        schema: {
            tags: ['Posts'],
            summary: 'Pesquisar posts',
            description: 'Retorna posts conforme o filtro',
            security: [{ bearerAuth: [] }],
            querystring: searchPostQuerySchema
        }
    }, search);
}
