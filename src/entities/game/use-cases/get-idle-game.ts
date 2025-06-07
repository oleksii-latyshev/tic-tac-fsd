import { GameIdleEntity, GameStatuses } from '@/entities/game/domain'
import { GameRepository } from '@/entities/game/repositories/game.repository'

export async function getIdleGames(): Promise<GameIdleEntity[]> {
  const games = await GameRepository.gamesList({
    where: {
      status: GameStatuses.IDLE,
    },
  })

  return games as GameIdleEntity[]
}
