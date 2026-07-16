import { useState } from 'react'
import { FaEnvelope, FaLinkedin } from 'react-icons/fa6'
import { submitContact } from '../api/client.js'
import SectionWrapper from './SectionWrapper.jsx'

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
  website: '',
}

function Contact({ profile }) {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (event) => {
    setForm((value) => ({ ...value, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setStatus({ type: 'idle', message: '' })

    try {
      await submitContact(form)
      setForm(initialForm)
      setStatus({ type: 'success', message: 'Thanks. Your message was sent successfully.' })
    } catch {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again or email me directly.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <SectionWrapper id="contact" eyebrow="Contact" title="Let us build something." description="Send a message through the form, or use the direct links if you prefer.">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="rounded-3xl border border-white/10 bg-surface p-8">
          <h3 className="font-heading text-2xl font-bold text-white">Direct links</h3>
          <p className="mt-4 leading-7 text-zinc-400">For recruiters and collaborators, email and LinkedIn are the fastest ways to reach me.</p>
          <div className="mt-8 grid gap-4">
            {profile?.email && (
              <a className="focus-ring flex items-center gap-3 rounded-2xl bg-background p-4 text-zinc-200 transition hover:text-accent" href={`mailto:${profile.email}`}>
                <FaEnvelope aria-hidden="true" /> {profile.email}
              </a>
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
          </div>
        </aside>

        <form className="rounded-3xl border border-white/10 bg-surface p-8" onSubmit={handleSubmit}>
          <input
            type="text"
            name="website"
            value={form.website}
            onChange={handleChange}
            className="hidden"
            tabIndex="-1"
            autoComplete="off"
            aria-hidden="true"
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-zinc-300">
              Name
              <input
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                className="focus-ring rounded-2xl border border-white/10 bg-background px-4 py-3 text-white"
                placeholder="Your name"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-zinc-300">
              Email
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="focus-ring rounded-2xl border border-white/10 bg-background px-4 py-3 text-white"
                placeholder="you@example.com"
              />
            </label>
          </div>

          <label className="mt-5 grid gap-2 text-sm font-semibold text-zinc-300">
            Subject
            <input
              required
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="focus-ring rounded-2xl border border-white/10 bg-background px-4 py-3 text-white"
              placeholder="Opportunity, collaboration, or question"
            />
          </label>

          <label className="mt-5 grid gap-2 text-sm font-semibold text-zinc-300">
            Message
            <textarea
              required
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="6"
              className="focus-ring resize-y rounded-2xl border border-white/10 bg-background px-4 py-3 text-white"
              placeholder="Tell me what you are working on."
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="focus-ring mt-6 w-full rounded-full bg-accent px-6 py-3 font-bold text-background transition hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? 'Sending...' : 'Send Message'}
          </button>

          {status.message && (
            <p className={`mt-4 rounded-2xl px-4 py-3 text-sm font-semibold ${status.type === 'success' ? 'bg-green-500/10 text-green-300' : 'bg-red-500/10 text-red-300'}`}>
              {status.message}
            </p>
          )}
        </form>
      </div>
    </SectionWrapper>
  )
}

export default Contact
