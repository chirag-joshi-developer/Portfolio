import SectionWrapper from './SectionWrapper.jsx'

function About({ profile }) {
  const quickFacts = profile?.quick_facts || []

  return (
    <SectionWrapper id="about" eyebrow="About" title="Fast context, deeper story." description="A concise overview for recruiters, with key facts available at a glance.">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-3xl border border-white/10 bg-surface p-4">
          {profile?.profile_photo_url ? (
            <img
              src={profile.profile_photo_url}
              alt={`${profile.full_name || 'Chirag'} portrait`}
              className="aspect-[4/5] w-full rounded-2xl object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex aspect-[4/5] items-center justify-center rounded-2xl bg-background font-heading text-7xl font-bold text-accent">
              C
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-white/10 bg-surface p-8 sm:p-10">
          <p className="text-lg leading-8 text-zinc-300">{profile?.bio || 'Add your professional bio from Django Admin.'}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {quickFacts.length ? (
              quickFacts.map((fact) => (
                <div key={fact.label} className="rounded-2xl border border-white/10 bg-background p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">{fact.label}</p>
                  <p className="mt-2 font-heading text-xl font-bold text-white">{fact.value}</p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-white/10 bg-background p-5 text-zinc-400">Quick facts will appear here.</div>
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default About
