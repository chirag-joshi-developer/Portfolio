import { Link } from 'react-router-dom'
import { HiArrowLeft } from 'react-icons/hi'

function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-background px-5 text-center">
      <div className="max-w-lg rounded-3xl border border-white/10 bg-surface p-8">
        <p className="font-heading text-6xl font-bold text-accent">404</p>
        <h1 className="mt-4 font-heading text-3xl font-bold text-white">Page not found</h1>
        <p className="mt-3 leading-7 text-zinc-400">The page you are looking for does not exist.</p>
        <Link to="/" className="focus-ring mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-bold text-background">
          <HiArrowLeft aria-hidden="true" /> Back home
        </Link>
      </div>
    </main>
  )
}

export default NotFound
