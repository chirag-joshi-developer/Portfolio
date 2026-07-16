import SectionWrapper from './SectionWrapper.jsx'
import ProjectCard from './ProjectCard.jsx'

function Projects({ projects = [] }) {
  const orderedProjects = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured) || a.order - b.order)

  return (
    <SectionWrapper
      id="projects"
      eyebrow="Projects"
      title="Selected work."
      description="Cards are optimized for quick scanning. Click any project to open its dedicated detail page."
    >
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        {orderedProjects.length ? (
          orderedProjects.map((project, index) => <ProjectCard key={project.id} project={project} large={project.featured && index === 0} />)
        ) : (
          <p className="col-span-full rounded-3xl border border-white/10 bg-surface p-8 text-center text-zinc-400">Projects will appear after they are added in admin.</p>
        )}
      </div>
    </SectionWrapper>
  )
}

export default Projects
