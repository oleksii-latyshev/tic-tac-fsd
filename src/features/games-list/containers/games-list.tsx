import { getIdleGames } from '@/entities/game/server'
import { CreateButton } from '@/features/games-list/containers/create-button'
import { GamesCard } from '@/features/games-list/ui/game-card'
import { Layout } from '@/features/games-list/ui/layout'

export async function GamesList() {
  const games = await getIdleGames()

  return (
    <Layout actions={<CreateButton />}>
      {games.map(({ id, creator, status }) => (
        <GamesCard key={id} login={creator.login} rating={creator.rating} status={status} />
      ))}
    </Layout>
  )
}
