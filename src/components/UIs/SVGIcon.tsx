import { MouseEvent } from 'react'
import { PUBLIC_ICONS_FOLDER } from '@/constant'
import { IconNames } from '@/constant/icon.type'

type IconProps = {
  name?: IconNames
  size?: number
  className?: string
  onClick?: (e: MouseEvent<HTMLImageElement>) => void
}

export default function SVGIcon({
  name = 'github',
  size,
  className,
  onClick = undefined,
}: IconProps) {
  return (
    <img
      src={`${PUBLIC_ICONS_FOLDER}/${name}.svg`}
      className={`w-4 md:w-auto h-auto object-contain ${className}`}
      style={{ width: size }}
      onClick={onClick}
    />
  )
}
