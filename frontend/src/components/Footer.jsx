import { FaGithub, FaLinkedin } from 'react-icons/fa6'

function Footer({ profile }) {
  return (
    <footer className="border-t border-white/10 px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <p>Copyright {new Date().getFullYear()} {profile?.full_name || 'Chirag'}. Built with Django, React, and Tailwind CSS.</p>
        <div className="flex gap-3">
          {profile?.github_url && (
            <a href={profile.github_url} target="_blank" rel="noreferrer" className="text-zinc-400 transition hover:text-accent" aria-label="GitHub">
              <FaGithub aria-hidden="true" />
            </a>
          )}
          {profile?.linkedin_url && (
            <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="text-zinc-400 transition hover:text-accent" aria-label="LinkedIn">
              <FaLinkedin aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}

export default Footer
