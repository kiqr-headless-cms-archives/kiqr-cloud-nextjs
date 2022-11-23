import classNames from 'classnames'
import React, { ReactElement } from 'react'

interface PlaceholderProps {
  length?: number
  size?: string
}

export const Placeholder = ({
  length = 20,
  size = undefined,
}: PlaceholderProps): ReactElement => {
  const text = 'o'.repeat(length)

  return (
    <span
      className={classNames('animate-pulse', 'bg-slate-200', 'rounded', {
        'text-xs leading-3': size === 'small',
      })}
    >
      <span className="invisible">{text}</span>
    </span>
  )
}
