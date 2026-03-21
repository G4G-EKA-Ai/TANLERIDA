import { PrismaClient } from '../generated/prisma/client'

const globalForPrisma = globalThis as typeof globalThis & {
  __tangredPrisma?: PrismaClient
}

function createPrismaClient() {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })
}

export function getPrismaClient() {
  if (!globalForPrisma.__tangredPrisma) {
    globalForPrisma.__tangredPrisma = createPrismaClient()
  }

  return globalForPrisma.__tangredPrisma
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, property, receiver) {
    const client = getPrismaClient()
    return Reflect.get(client, property, receiver)
  },
})
