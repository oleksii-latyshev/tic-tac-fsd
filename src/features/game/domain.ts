export type PlayerEntity = {
  id: string
  login: string
  rating: number
}

export enum GameStatuses {
  IDLE = 'IDLE',
  IN_PROGRESS = 'IN_PROGRESS',
  DRAW = 'DRAW',
  OVER = 'OVER',
}

export type GameSymbol = string

export type Cell = GameSymbol | null

export type GameField = Cell[]

export type GameIdleEntity = {
  id: string
  creator: PlayerEntity
  status: GameStatuses.IDLE
}

export type GameInProgressEntity = {
  id: string
  players: PlayerEntity[]
  field: GameField
  status: GameStatuses.IN_PROGRESS
}

export type GameOverEntity = {
  id: string
  players: PlayerEntity[]
  field: GameField
  status: GameStatuses.OVER
  winner: PlayerEntity
}

export type GameOverDrawEntity = {
  id: string
  players: PlayerEntity[]
  field: GameField
  isDraw: boolean
  status: GameStatuses.DRAW
}

export type GameEntity =
  | GameIdleEntity
  | GameInProgressEntity
  | GameOverEntity
  | GameOverDrawEntity
