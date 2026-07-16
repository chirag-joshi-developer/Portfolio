import { useEffect, useRef, useState } from 'react'
import { HiChevronDown, HiDownload } from 'react-icons/hi'

function ResumeDropdown({ profile }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  const resumes = profile?.resumes?.length
    ? profile.resumes
    : profile?.resume_pdf_url
      ? [{ id: 'default', label: 'Resume', file_url: profile.resume_pdf_url }]
      : []

  useEffect(() => {
    if (!open) return undefined

    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  if (!resumes.length) {
    return null
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-bold text-white transition hover:border-accent hover:text-accent"
      >
        <HiDownload aria-hidden="true" /> Download Resume
        <HiChevronDown
          aria-hidden="true"
          className={`transition ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full z-20 mt-2 w-64 max-w-[80vw] overflow-hidden rounded-2xl border border-white/10 bg-surface p-2 shadow-2xl shadow-black/40"
        >
          {resumes.map((resume) => (
            <a
              key={resume.id}
              href={resume.file_url}
              target="_blank"
              rel="noreferrer"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="focus-ring flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-200 transition hover:bg-white/5 hover:text-accent"
            >
              <HiDownload aria-hidden="true" className="shrink-0 text-lg" />
              <span className="truncate">{resume.label}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export default ResumeDropdown
