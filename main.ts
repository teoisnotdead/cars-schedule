import { Application } from "./deps.ts"
import router from "./routes/appointment.routes.ts"
import env from "./config/env.ts"

const app = new Application()

// Middleware para manejar rutas
app.use(router.routes())
app.use(router.allowedMethods())

console.log(`Server running on http://localhost:${env.PORT}`)
await app.listen({ port: env.PORT })
