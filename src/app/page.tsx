import { prisma } from '@/shared/lib/db'
import { Card, CardHeader, CardTitle } from '@/shared/ui/card'

export default async function Home() {
  const games = await prisma.game.findMany()

  return (
    <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
      {games.map(({ id, name }) => (
        <Card key={id}>
          <CardHeader>
            <CardTitle>{name}</CardTitle>
          </CardHeader>
        </Card>
      ))}
    </ul>
  )
}
