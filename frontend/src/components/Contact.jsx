import { FaEnvelope, FaLinkedin, FaPhone } from 'react-icons/fa6'
import SectionWrapper from './SectionWrapper.jsx'

function Contact({ profile }) {
  const hasContact = Boolean(profile?.email || profile?.linkedin_url || profile?.mobile_number)

  return (
    <SectionWrapper
      id="contact"
      eyebrow="Contact"
      title="Let us build something."
      description="Happy to connect over email, LinkedIn, or a quick call."
    >
      <div className="mx-auto max-w-xl">
        <div className="rounded-3xl border border-white/10 bg-surface p-8">
          <h3 className="font-heading text-2xl font-bold text-white">Get in touch</h3>
          <p className="mt-4 leading-7 text-zinc-400">
            Feel free to reach out if you have a role, project, or question in mind.
          </p>
          <div className="mt-8 grid gap-4">
            {profile?.email && (
              <a
                className="focus-ring flex items-center gap-3 rounded-2xl bg-background p-4 text-zinc-200 transition hover:text-accent"
                href={`mailto:${profile.email}`}
              >
                <FaEnvelope aria-hidden="true" /> {profile.email}
              </a>
            )}
            {profile?.mobile_number && (
              <div className="flex items-center gap-3 rounded-2xl bg-background p-4 text-zinc-200">
                <FaPhone aria-hidden="true" /> {profile.mobile_number}
              </div>
            )}
            {profile?.linkedin_url && (
              <a
                className="focus-ring flex items-center gap-3 rounded-2xl bg-background p-4 text-zinc-200 transition hover:text-accent"
                href={profile.linkedin_url}
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin aria-hidden="true" /> LinkedIn profile
              </a>
            )}
            {!hasContact && (
              <p className="text-zinc-400">Add email, mobile, or LinkedIn in Django Admin to show contact links here.</p>
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default Contact
