import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[80dvh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="font-serif text-ink text-[clamp(4rem,12vw,7rem)] leading-none">404</h1>
      <p className="mt-4 text-muted">This page doesn't exist.</p>
      <Link href="/" className="link mt-8 text-[15px]">
        Back home
      </Link>
    </div>
  )
}
