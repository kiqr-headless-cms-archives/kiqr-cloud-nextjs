import { Logo } from 'components/atoms/Logo'

export const LoadingScreen = () => {
  return (
    <div
      className={
        'fixed flex-col gap-y-2 items-center justify-center flex top-0 bottom-0 left-0 right-0 bg-neutral-50'
      }
    >
      <div className="animate-pulse">
        <Logo />
      </div>
    </div>
  )
}
