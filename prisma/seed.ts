import { PrismaClient, Prisma } from '@/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  const gameData: Prisma.GameCreateInput[] = Array.from({ length: 100 }, (_, i) => ({
    name: `Game ${i + 1}`,
  }))

  await prisma.game.createMany({
    data: gameData,
  })

  console.log(`🌱 Inserted ${gameData.length} games into the database.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
