import { PrismaClient } from '@/generated/prisma'
import { seedUsers } from './seeds/users'
import { seedGames } from './seeds/games'

const prisma = new PrismaClient()

async function main() {
  const users = await seedUsers(prisma, 100)

  await seedGames(prisma, users, 30)
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
