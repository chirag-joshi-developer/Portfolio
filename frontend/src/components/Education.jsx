import SectionWrapper from './SectionWrapper.jsx'

function year(value) {
  return value ? new Date(value).getFullYear() : 'Present'
}

function Education({ education = [] }) {
  return (
    <SectionWrapper id="education" eyebrow="Education" title="Academic foundation." description="Degrees, coursework, and structured learning that support the project work.">
      <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
        {education.length ? (
          education.map((item) => (
            <article key={item.id} className="rounded-3xl border border-white/10 bg-surface p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">
                {year(item.start_date)} - {year(item.end_date)}
              </p>
              <h3 className="mt-3 font-heading text-2xl font-bold text-white">{item.degree}</h3>
              <p className="mt-1 text-accent">{item.institution}</p>
              {item.field_of_study && <p className="mt-2 text-zinc-300">{item.field_of_study}</p>}
              {item.grade && <p className="mt-3 inline-flex rounded-full bg-white/5 px-3 py-1 text-sm text-zinc-300">{item.grade}</p>}
              {item.description && <p className="mt-4 leading-7 text-zinc-400">{item.description}</p>}
            </article>
          ))
        ) : (
          <p className="col-span-full rounded-3xl border border-white/10 bg-surface p-8 text-center text-zinc-400">Education entries will appear after they are added in admin.</p>
        )}
      </div>
    </SectionWrapper>
  )
}

export default Education
