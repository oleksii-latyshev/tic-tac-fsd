import { GamesList } from '@/features/games-list/server'

export default async function Home() {
  return (
    <div className="p-4 container mx-auto flex flex-col gap-4">
      <div className="space-y-1">
        <h1 className="text-4xl font-bold">Available Games 🧠</h1>
        <p className="leading-relaxed text-xl">Find a game to join or create a new one!</p>
      </div>
      <GamesList />
    </div>
  )
}
