import { Game, GameStatuses, Prisma, PrismaClient, User } from '@/generated/prisma'

function getRandomStatus(): GameStatuses {
  const statuses = Object.values(GameStatuses)
  return statuses[Math.floor(Math.random() * statuses.length)]
}

function getRandomUsers(users: User[], count: number): User[] {
  const shuffled = users.slice().sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export async function seedGames(db: PrismaClient, users: User[], count = 30): Promise<Game[]> {
  const gameData: Prisma.GameCreateInput[] = Array.from({ length: count }, () => {
    const status = getRandomStatus()
    const playersCount = status === GameStatuses.IDLE ? 1 : 2
    const selectedUsers = getRandomUsers(users, playersCount)
    return {
      status,
      field: Array(9).fill(null),
      players: {
        connect: selectedUsers.map((u) => ({ id: u.id })),
      },
    }
  })

  const { count: insertedGamesCount } = await db.game.createMany({
    data: gameData.map(({ status }) => ({ status })), // createMany does not support connect, only simple fields 👀
  })

  const createdGames = await db.game.findMany({
    orderBy: { id: 'desc' },
    take: 100,
  })

  await Promise.all(
    createdGames.map((game, i) =>
      db.game.update({
        where: { id: game.id },
        data: {
          players: {
            set: [],
            connect: gameData[i].players?.connect ?? [],
          },
        },
      }),
    ),
  )

  console.log(`🌱 Inserted ${insertedGamesCount} games into the database.`)

  const games = await db.game.findMany({
    orderBy: { id: 'desc' },
    take: 100,
  })

  return games
}
