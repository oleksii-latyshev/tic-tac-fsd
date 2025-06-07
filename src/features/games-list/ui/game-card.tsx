import { GameStatuses } from '@/entities/game/domain'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'

type GameCardProps = {
  login: string
  rating: number
  status: GameStatuses
}

export function GamesCard({ login, rating, status }: GameCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {login} ({rating} ✨) vs ...
        </CardTitle>
        <CardDescription>{status}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  )
}
