import {
  GameEntity,
  GameIdleEntity,
  GameInProgressEntity,
  GameOverDrawEntity,
  GameOverEntity,
  GameStatuses,
} from '@/entities/game/domain'
import { Game, Prisma, User } from '@/generated/prisma'
import { prisma } from '@/shared/lib/db'
import { removePasswordHash } from '@/shared/lib/password'
import { z } from 'zod'

const fieldSchema = z.array(z.union([z.string(), z.null()]))

function dbGameToGameEntity(
  game: Game & {
    players: User[]
    winner?: User | null
  },
): GameEntity {
  const players = game.players.map(removePasswordHash)

  switch (game.status) {
    case GameStatuses.IDLE: {
      const [creator] = players

      if (!creator) {
        throw new Error(`Game ${game.id} is marked as IDLE but has no players.`)
      }

      return {
        id: game.id,
        creator,
        status: GameStatuses.IDLE,
      } satisfies GameIdleEntity
    }
    case GameStatuses.IN_PROGRESS: {
      return {
        id: game.id,
        players,
        field: fieldSchema.parse(game.field),
        status: GameStatuses.IN_PROGRESS,
      } satisfies GameInProgressEntity
    }
    case GameStatuses.OVER: {
      if (!game.winner) {
        throw new Error(`Game ${game.id} is marked as OVER but has no winner.`)
      }

      return {
        id: game.id,
        players,
        field: fieldSchema.parse(game.field),
        winner: removePasswordHash(game.winner),
        status: GameStatuses.OVER,
      } satisfies GameOverEntity
    }
    case GameStatuses.DRAW: {
      return {
        id: game.id,
        players,
        field: fieldSchema.parse(game.field),
        status: GameStatuses.DRAW,
        isDraw: true,
      } satisfies GameOverDrawEntity
    }
    default: {
      throw new Error(`Unknown game status: ${game.status}`)
    }
  }
}

async function gamesList({ where }: { where: Prisma.GameWhereInput }): Promise<GameEntity[]> {
  const games = await prisma.game.findMany({
    where,
    include: {
      players: true,
      winner: true,
    },
  })

  return games.map(dbGameToGameEntity)
}

async function createGame({ id, creator }: GameIdleEntity): Promise<GameEntity> {
  const createdGame = await prisma.game.create({
    data: {
      status: GameStatuses.IDLE,
      id,
      field: Array(9).fill(null),
      players: {
        connect: [{ id: creator.id }],
      },
    },
    include: {
      players: true,
      winner: true,
    },
  })

  return dbGameToGameEntity(createdGame)
}

export const GameRepository = {
  gamesList,
  createGame,
}
