import SectionWrapper from './SectionWrapper.jsx'

function groupSkills(skills) {
  return skills.reduce((groups, skill) => {
    const key = skill.category_label || skill.category
    groups[key] = groups[key] || []
    groups[key].push(skill)
    return groups
  }, {})
}

function Skills({ skills = [] }) {
  const groups = groupSkills(skills)

  return (
    <SectionWrapper id="skills" eyebrow="Skills" title="Tools I use to ship." description="Grouped skills make the scan quick while still showing breadth.">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
        {Object.keys(groups).length ? (
          Object.entries(groups).map(([category, items]) => (
            <article key={category} className="rounded-3xl border border-white/10 bg-surface p-6">
              <h3 className="font-heading text-2xl font-bold text-white">{category}</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {items.map((skill) => (
                  <span key={skill.id} className="rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
                    {skill.icon && <span className="mr-2">{skill.icon}</span>}
                    {skill.name}
                  </span>
                ))}
              </div>
            </article>
          ))
        ) : (
          <p className="col-span-full rounded-3xl border border-white/10 bg-surface p-8 text-center text-zinc-400">Skills will appear after they are added in admin.</p>
        )}
      </div>
    </SectionWrapper>
  )
}

export default Skills
