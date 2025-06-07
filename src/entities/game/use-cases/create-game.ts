import { GAME_ERRORS } from '@/entities/game/constants'
import { GameStatuses, PlayerEntity } from '@/entities/game/domain'
import { GameRepository } from '@/entities/game/repositories/game.repository'
import { buildLeft, buildRight } from '@/shared/lib/either'
import cuid from 'cuid'

export async function createGame(player: PlayerEntity) {
  const existingGames = await GameRepository.gamesList({
    where: {
      players: {
        some: {
          id: player.id,
        },
      },
      status: GameStatuses.IDLE,
    },
  })

  const isPlayerCreatorOfExistingGames = existingGames.some(
    (game) => game.status === GameStatuses.IDLE && game.creator.id === player.id,
  )

  if (isPlayerCreatorOfExistingGames) {
    return buildLeft(GAME_ERRORS.canCreateOnlyOneGame)
  }

  const createdGame = await GameRepository.createGame({
    creator: player,
    id: cuid(),
    status: GameStatuses.IDLE,
  })

  return buildRight(createdGame)
}
