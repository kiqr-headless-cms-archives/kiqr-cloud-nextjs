import { Button } from '@kiqr/cloud-ui'
import { Logo } from 'components/atoms/Logo'

export const LoginScreen: React.FC<{
  loginCallback?: () => void
}> = ({ loginCallback }) => {
  return (
    <div
      className={
        'fixed flex-col gap-y-2 items-center justify-center flex top-0 bottom-0 left-0 right-0 bg-neutral-50'
      }
    >
      <div>
        <Logo />
        <Button onClick={loginCallback} variant="primary">
          Log in with KIQR.ID
        </Button>
      </div>
    </div>
  )
}
