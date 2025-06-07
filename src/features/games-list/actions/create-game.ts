'use server'

import { createGame } from '@/entities/game/server'
import { prisma } from '@/shared/lib/db'

export async function createGameAction() {
  const [user] = await prisma.user.findMany({
    take: 1,
  })

  const createdGame = await createGame(user)

  return createdGame
}
