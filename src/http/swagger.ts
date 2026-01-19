import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import { jsonSchemaTransform } from 'fastify-type-provider-zod'

const swaggerPlugin: FastifyPluginAsync = async (app) => {
    await app.register(swagger, {
        openapi: {
            info: {
                title: 'Tech Challenge 2 API',
                description: 'API de blogging educacional',
                version: '1.0.0'
            },
            tags: [
                { name: 'Users', description: 'Usuários' },
                { name: 'Posts', description: 'Postagens' }
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT'
                    }
                }
            }
        },
        transform: jsonSchemaTransform
    })

    await app.register(swaggerUi, {
        routePrefix: '/docs'
    })
}

export default fp(swaggerPlugin)
