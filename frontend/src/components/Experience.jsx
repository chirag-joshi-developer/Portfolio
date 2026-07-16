import SectionWrapper from './SectionWrapper.jsx'

function formatDate(value) {
  if (!value) return 'Present'
  return new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(new Date(value))
}

function Experience({ experience = [] }) {
  return (
    <SectionWrapper id="experience" eyebrow="Experience" title="Where I have applied the work." description="A concise timeline of roles, responsibilities, and outcomes.">
      <div className="mx-auto max-w-4xl">
        {experience.length ? (
          <div className="relative border-l border-white/10 pl-6">
            {experience.map((item) => (
              <article key={item.id} className="relative mb-8 rounded-3xl border border-white/10 bg-surface p-6 last:mb-0">
                <span className="absolute -left-[35px] top-8 h-4 w-4 rounded-full border-4 border-background bg-accent" />
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-white">{item.role}</h3>
                    <p className="mt-1 text-accent">{item.company_name}</p>
                    {item.location && <p className="mt-1 text-sm text-zinc-500">{item.location}</p>}
                  </div>
                  <p className="rounded-full bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-300">
                    {formatDate(item.start_date)} - {formatDate(item.end_date)}
                  </p>
                </div>

                <ul className="mt-5 space-y-3 text-zinc-400">
                  {(item.bullets || []).map((bullet) => (
                    <li key={bullet} className="flex gap-3 leading-7">
                      <span className="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        ) : (
          <p className="rounded-3xl border border-white/10 bg-surface p-8 text-center text-zinc-400">Experience entries will appear after they are added in admin.</p>
        )}
      </div>
    </SectionWrapper>
  )
}

export default Experience
