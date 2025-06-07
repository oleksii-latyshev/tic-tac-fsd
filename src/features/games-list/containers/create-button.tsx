'use client'

import { GAME_ERRORS } from '@/entities/game/constants'
import { createGameAction } from '@/features/games-list/actions/create-game'
import { buildRight, matchEither } from '@/shared/lib/either'
import { useActionState } from '@/shared/lib/react'
import { Button } from '@/shared/ui/button'
import { PlusIcon } from 'lucide-react'

export function CreateButton() {
  const [data, dispatch, isPending] = useActionState(createGameAction, buildRight(undefined))

  return (
    <div className="flex flex-col justify-end items-end gap-2">
      <Button variant="default" disabled={isPending} onClick={dispatch}>
        Create a game
        <PlusIcon className="size-4" />
      </Button>
      {matchEither(data, {
        onLeft: (error) => <div className="text-destructive">{getErrorContent(error)}</div>,
        onRight: () => null,
      })}
    </div>
  )
}

function getErrorContent(error: string) {
  switch (error) {
    case GAME_ERRORS.canCreateOnlyOneGame:
      return 'You can only create one game at a time. Please wait for the current game to finish.'

    default:
      return 'Something went wrong. Please try again later.'
  }
}
