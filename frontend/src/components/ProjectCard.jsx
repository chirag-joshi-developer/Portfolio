import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaGithub } from 'react-icons/fa6'
import { HiExternalLink } from 'react-icons/hi'

function ProjectCard({ project, large = false }) {
  return (
    <motion.article
      className={`group overflow-hidden rounded-3xl border border-white/10 bg-surface ${large ? 'md:col-span-2' : ''}`}
      whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <Link to={`/projects/${project.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-background">
          {project.cover_image_url ? (
            <img
              src={project.cover_image_url}
              alt={`${project.title} cover`}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center font-heading text-4xl font-bold text-accent">{project.title}</div>
          )}
          {project.featured && (
            <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-background">
              Featured
            </span>
          )}
        </div>
      </Link>

      <div className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">{project.category || 'Project'}</p>
            <h3 className="mt-2 font-heading text-2xl font-bold text-white">{project.title}</h3>
          </div>
          <div className="flex gap-2 opacity-100 transition md:opacity-0 md:group-hover:opacity-100">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noreferrer"
                className="focus-ring rounded-full border border-white/10 p-3 text-zinc-300 transition hover:border-accent hover:text-accent"
                aria-label={`View ${project.title} live`}
              >
                <HiExternalLink aria-hidden="true" />
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="focus-ring rounded-full border border-white/10 p-3 text-zinc-300 transition hover:border-accent hover:text-accent"
                aria-label={`View ${project.title} on GitHub`}
              >
                <FaGithub aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        <p className="mt-4 leading-7 text-zinc-400">{project.short_description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {(project.tech_stack_list || []).map((tech) => (
            <span key={tech} className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-300">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

export default ProjectCard
