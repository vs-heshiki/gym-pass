import { makeRegisterUserService } from '@/data/factories'
import { UserAlreadyExistsError } from '@/data/errors'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const registerUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const registerUserSchema = z.object({
        name: z.string().min(3),
        email: z.string().email(),
        phone: z.string(),
        password: z.string().min(6)
    })

    const data = registerUserSchema.parse(request.body)

    try {
        const register = makeRegisterUserService()

        await register.execute(data)
    } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ error: err.message })
        }
    }

    return reply.status(201).send()
}
