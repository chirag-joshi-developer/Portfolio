import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Link, useParams } from 'react-router-dom'
import { FaGithub } from 'react-icons/fa6'
import { HiArrowLeft, HiExternalLink } from 'react-icons/hi'
import { getProject } from '../api/client.js'

function ProjectDetail() {
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    if (!slug) {
      setError('Project not found or API unavailable.')
      setLoading(false)
      return undefined
    }

    getProject(slug)
      .then((payload) => {
        if (mounted) {
          setProject(payload)
        }
      })
      .catch((err) => {
        if (mounted) {
          const detail = err?.message?.slice?.(0, 180)
          setError(
            detail && !detail.startsWith('<')
              ? `Project not found or API unavailable. (${detail})`
              : 'Project not found or API unavailable.',
          )
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false)
        }
      })

    return () => {
      mounted = false
    }
  }, [slug])

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-background px-5 text-center">
        <div>
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-accent" />
          <p className="mt-6 font-heading text-2xl font-bold text-white">Loading project...</p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="grid min-h-screen place-items-center bg-background px-5 text-center">
        <div className="max-w-lg rounded-3xl border border-white/10 bg-surface p-8">
          <p className="font-heading text-2xl font-bold text-white">Project unavailable</p>
          <p className="mt-3 leading-7 text-zinc-400">{error}</p>
          <Link to="/" className="focus-ring mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-bold text-background">
            <HiArrowLeft aria-hidden="true" /> Back home
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <Link to="/#projects" className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 font-bold text-zinc-200 transition hover:border-accent hover:text-accent">
          <HiArrowLeft aria-hidden="true" /> Back to projects
        </Link>

        <section className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">{project.category || 'Project'}</p>
            <h1 className="mt-4 font-heading text-5xl font-bold tracking-tight text-white sm:text-7xl">{project.title}</h1>
            <p className="mt-6 text-xl leading-8 text-zinc-300">{project.short_description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {(project.tech_stack_list || []).map((tech) => (
                <span key={tech} className="rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              {project.live_url && (
                <a href={project.live_url} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-bold text-background transition hover:bg-accent-hover">
                  View Live <HiExternalLink aria-hidden="true" />
                </a>
              )}
              {project.github_url && (
                <a href={project.github_url} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 font-bold text-white transition hover:border-accent hover:text-accent">
                  GitHub <FaGithub aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-surface p-4">
            {project.cover_image_url ? (
              <img src={project.cover_image_url} alt={`${project.title} cover`} className="aspect-[16/11] w-full rounded-2xl object-cover" loading="eager" />
            ) : (
              <div className="flex aspect-[16/11] items-center justify-center rounded-2xl bg-surface font-heading text-3xl font-bold text-accent">{project.title}</div>
            )}
          </div>
        </section>

        <section className="mt-14 grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="rounded-3xl border border-white/10 bg-surface p-6">
            <h2 className="font-heading text-2xl font-bold text-white">Gallery</h2>
            <div className="mt-5 grid gap-4">
              {(project.gallery || []).length ? (
                project.gallery.map((image) => (
                  <figure key={image.id} className="overflow-hidden rounded-2xl bg-background">
                    <img src={image.image_url} alt={image.caption || `${project.title} screenshot`} className="aspect-video w-full object-cover" loading="lazy" />
                    {image.caption && <figcaption className="p-3 text-sm text-zinc-400">{image.caption}</figcaption>}
                  </figure>
                ))
              ) : (
                <p className="text-zinc-400">Gallery images can be added from Django Admin.</p>
              )}
            </div>
          </div>

          <article className="markdown-content rounded-3xl border border-white/10 bg-surface p-6">
            <ReactMarkdown>{project.description}</ReactMarkdown>
          </article>
        </section>
      </div>
    </main>
  )
}

export default ProjectDetail
