import { PropsWithChildren } from 'react'

export function Layout({
  children,
  actions,
}: PropsWithChildren & {
  actions: React.ReactNode
}) {
  return (
    <div className="space-y-4">
      {actions}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {children}
      </ul>
    </div>
  )
}
