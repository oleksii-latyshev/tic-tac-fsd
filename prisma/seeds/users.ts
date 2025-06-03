import { Prisma, PrismaClient, User } from '@/generated/prisma'

export async function seedUsers(db: PrismaClient, count = 10): Promise<User[]> {
  const usersData: Prisma.UserCreateInput[] = Array.from({ length: count }, (_, i) => ({
    login: `user${i + 1}`,
    rating: Math.floor(Math.random() * 10) + 1,
    passwordHash: `hashed_password_${i + 1}`,
  }))

  const { count: insertedUsersCount } = await db.user.createMany({
    data: usersData,
  })

  console.log(`🌱 Inserted ${insertedUsersCount} users into the database.`)

  const usersLogins = usersData.map((user) => user.login)

  const users = await db.user.findMany({
    where: {
      login: {
        in: usersLogins,
      },
    },
  })

  return users
}
