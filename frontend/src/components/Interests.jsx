import { HiSparkles } from 'react-icons/hi'
import SectionWrapper from './SectionWrapper.jsx'

function Interests({ interests = [] }) {
  return (
    <SectionWrapper
      id="interests"
      eyebrow="Interests"
      title="Beyond the resume."
      description="Small personal signals that make the page feel human without slowing down the recruiter scan."
    >
      <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {interests.length ? (
          interests.map((interest) => (
            <article key={interest.id} className="rounded-3xl border border-white/10 bg-surface p-6 transition hover:-translate-y-1 hover:border-accent/50">
              <div className="mb-5 inline-flex rounded-2xl bg-accent/10 p-3 text-2xl text-accent">
                {interest.icon || <HiSparkles aria-hidden="true" />}
              </div>
              <h3 className="font-heading text-xl font-bold text-white">{interest.name}</h3>
              {interest.note && <p className="mt-3 leading-7 text-zinc-400">{interest.note}</p>}
            </article>
          ))
        ) : (
          <p className="col-span-full rounded-3xl border border-white/10 bg-surface p-8 text-center text-zinc-400">Interests will appear after they are added in admin.</p>
        )}
      </div>
    </SectionWrapper>
  )
}

export default Interests
