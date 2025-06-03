import { GameIdleEntity, GameStatuses } from '@/features/game/domain'
import { GameRepository } from '@/features/game/repositories/game.repository'

export async function getIdleGames(): Promise<GameIdleEntity[]> {
  const games = await GameRepository.gamesList({
    where: {
      status: GameStatuses.IDLE,
    },
  })

  return games as GameIdleEntity[]
}
