import { Logo } from '@components'
import Link from 'next/link'

export const LinkedLogo = () => {
  return (
    <Link href="/">
      <Logo />
    </Link>
  )
}
