import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { trpc } from '@elysiajs/trpc'
import { appRouter } from '@luminera/trpc'

const app = new Elysia()
    .use(cors()) 
    .get('/', () => 'Hello Elysia')
    .use( 
        trpc(appRouter)
    ) 
    .listen(3000)

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`)