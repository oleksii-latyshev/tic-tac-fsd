type Left<L> = {
  type: 'left'
  error: L
}

type Right<R> = {
  type: 'right'
  value: R
}

export type Either<R, L> = Left<L> | Right<R>

export function buildLeft<T>(error: T): Left<T> {
  return {
    type: 'left',
    error,
  }
}

export function buildRight<T>(value: T): Right<T> {
  return {
    type: 'right',
    value,
  }
}

export function isLeft<L>(either: Either<unknown, L>): either is Left<L> {
  return either.type === 'left'
}

export function isRight<R>(either: Either<R, unknown>): either is Right<R> {
  return either.type === 'right'
}

export function mapEither<R, R2, L = unknown>(
  either: Either<R, L>,
  fn: (value: R) => R2,
): Either<R2, L> {
  if (isRight(either)) {
    return buildRight(fn(either.value))
  }

  return either
}

export function mapRight<R, R2, L = unknown>(
  either: Either<R, L>,
  fn: (value: R) => R2,
): Either<R2, L> {
  if (isRight(either)) {
    return buildRight(fn(either.value))
  }

  return either
}

export function mapLeft<R, L, L2>(either: Either<R, L>, fn: (value: L) => L2): Either<R, L2> {
  if (isLeft(either)) {
    return buildLeft(fn(either.error))
  }

  return either
}

export function matchEither<R, L, T>(
  either: Either<R, L>,
  { onLeft, onRight }: { onLeft: (error: L) => T; onRight: (value: R) => T },
): T {
  if (isLeft(either)) {
    return onLeft(either.error)
  }

  return onRight(either.value)
}
