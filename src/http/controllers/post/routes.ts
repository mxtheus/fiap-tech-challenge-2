import { FastifyInstance } from 'fastify'
import { create } from './create'
import { deletePost } from './delete'
import { findPost } from './find'
import { findAllPosts } from './find-all-posts'
import { search } from './search'
import { update } from './update'

export async function postsRoutes(app: FastifyInstance) {
    app.get('/posts', findAllPosts);
    app.get('/posts/:id', findPost);
    app.post('/posts', create);
    app.put('/posts/:id', update);
    app.delete('/posts/:id', deletePost);
    app.get('/posts/search', search);
}
