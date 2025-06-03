import { getIdleGames } from '@/features/game/server'
import { cn } from '@/shared/lib/css'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { HTMLAttributes } from 'react'

export async function GamesList({ className, ...props }: HTMLAttributes<HTMLUListElement>) {
  const games = await getIdleGames()

  return (
    <ul
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4',
        className,
      )}
      {...props}
    >
      {games.map(({ id, creator, status }) => (
        <Card key={id}>
          <CardHeader>
            <CardTitle>
              {creator.login} ({creator.rating} ✨) vs ...
            </CardTitle>
            <CardDescription>{status}</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      ))}
    </ul>
  )
}
