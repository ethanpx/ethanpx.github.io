import { Ref, type PropsWithChildren } from 'react'

export default function Container({
  ref,
  children,
  className,
  innerClassName,
}: {
  className?: string
  innerClassName?: string
  ref?: Ref<HTMLDivElement | null>
} & PropsWithChildren) {
  return (
    <div ref={ref} className={`flex flex-col w-full items-center ${className}`}>
      <div
        className={`w-full max-w-7xl border-x border-neutral ${innerClassName}`}
      >
        {children}
      </div>
    </div>
  )
}
