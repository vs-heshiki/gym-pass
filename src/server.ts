import { app } from '@/app'

import { env } from '@/application/env'

app.listen({
    host: '0.0.0.0',
    port: env.PORT
}).then(() => console.log(`Listening in ${env.PORT} ✅`))
