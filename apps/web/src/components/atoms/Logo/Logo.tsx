import Image from 'next/image'

export const Logo = () => {
  return (
    <span className="flex w-full h-full items-center justify-center font-bold text-primary-700 hover:text-primary-900 transition">
      <Image src="/logo.svg" alt="KIQR Headless CMS" width={15} height={15} />
      <span className="ml-2">
        KIQR.<span className="text-slate-400">CLOUD</span>
      </span>
    </span>
  )
}
