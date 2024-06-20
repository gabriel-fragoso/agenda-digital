import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { PrismaClient } from '@prisma/client'
import cors from '@fastify/cors'

export const app = fastify()
const prisma = new PrismaClient()

app.register(cors)

app.get('/api/events', async (request, reply) => {
  try {
    const events = await prisma.event.findMany()
    reply.send(events)
  } catch (error) {
    console.error('Erro ao buscar eventos:', error)
    reply.status(500).send({ message: 'Erro interno do servidor' })
  }
})

app.post('/api/events', async (request, reply) => {
  const { title, start, end } = request.body as any
  try {
    const event = await prisma.event.create({
      data: { title, start, end },
    })
    reply.send(event)
  } catch (error) {
    console.error('Failed to add event:', error)
    reply.status(500).send({ message: 'Failed to add event' })
  }
})

app.patch('/api/events/:id', async (request, reply) => {
  const { id } = request.params as any
  const { title, start, end } = request.body as any
  try {
    const event = await prisma.event.update({
      where: { id },
      data: { title, start, end },
    })
    reply.send(event)
  } catch (error) {
    console.error('Failed to update event:', error)
    reply.status(500).send({ message: 'Failed to update event' })
  }
})

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issue: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like DataDog or Sentry or NewRelic
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
