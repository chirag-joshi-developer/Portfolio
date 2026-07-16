import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { useActiveSection } from '../hooks/useActiveSection.js'

const sections = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'interests', label: 'Interests' },
  { id: 'contact', label: 'Contact' },
]

const sectionIds = sections.map((section) => section.id)

function Navbar() {
  const [open, setOpen] = useState(false)
  const activeSection = useActiveSection(sectionIds)

  const handleClick = () => setOpen(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12" aria-label="Primary">
        <Link to="/" className="font-heading text-xl font-bold tracking-tight text-white">
          Chirag<span className="text-accent">.</span>
        </Link>

        <button
          type="button"
          className="focus-ring rounded-lg p-2 text-2xl text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <HiX aria-hidden="true" /> : <HiMenuAlt3 aria-hidden="true" />}
          <span className="sr-only">Toggle navigation</span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeSection === section.id ? 'bg-accent text-background' : 'text-zinc-300 hover:text-accent'
              }`}
            >
              {section.label}
            </a>
          ))}
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-white/10 bg-background px-5 py-4 md:hidden">
          <div className="grid gap-2">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={handleClick}
                className={`rounded-xl px-4 py-3 text-sm font-semibold ${
                  activeSection === section.id ? 'bg-accent text-background' : 'bg-white/5 text-zinc-200'
                }`}
              >
                {section.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
