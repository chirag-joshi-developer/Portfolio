import { motion } from 'framer-motion'
import { FaEnvelope, FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6'
import { HiArrowDown } from 'react-icons/hi'
import { useTypewriter } from '../hooks/useTypewriter.js'
import ResumeDropdown from './ResumeDropdown.jsx'

function Hero({ profile }) {
  const roles = profile?.roles_list?.length ? profile.roles_list : ['Software Engineer', 'AI/ML Enthusiast', 'Full-Stack Developer']
  const typedRole = useTypewriter(roles)

  const socials = [
    profile?.github_url && { href: profile.github_url, label: 'GitHub', icon: FaGithub },
    profile?.linkedin_url && { href: profile.linkedin_url, label: 'LinkedIn', icon: FaLinkedin },
    profile?.twitter_url && { href: profile.twitter_url, label: 'Twitter / X', icon: FaXTwitter },
    profile?.email && { href: `mailto:${profile.email}`, label: 'Email', icon: FaEnvelope },
  ].filter(Boolean)

  return (
    <section className="grid-bg relative isolate flex min-h-screen items-center overflow-hidden px-5 pb-16 pt-28 sm:px-8 lg:px-12">
      <motion.div
        className="absolute left-1/2 top-1/4 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl sm:h-[34rem] sm:w-[34rem]"
        animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="mb-5 inline-flex rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
            {profile?.tagline || 'Software Engineer focused on full-stack products and AI workflows.'}
          </p>

          <h1 className="font-heading text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl">
            {profile?.full_name || 'Chirag'}
          </h1>

          <div className="mt-5 min-h-12 font-heading text-2xl font-semibold text-accent sm:text-4xl">
            {typedRole}
            <span className="ml-1 animate-pulse">|</span>
          </div>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl">
            {profile?.intro || 'I build polished, practical software that turns ideas into usable products.'}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="focus-ring inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-bold text-background transition hover:bg-accent-hover"
            >
              View Projects <HiArrowDown aria-hidden="true" />
            </a>
            <ResumeDropdown profile={profile} />
            <a
              href="#contact"
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-bold text-white transition hover:border-accent hover:text-accent"
            >
              Contact Me
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}
                aria-label={label}
                className="focus-ring rounded-full border border-white/10 bg-white/5 p-3 text-xl text-zinc-200 transition hover:border-accent hover:text-accent"
              >
                <Icon aria-hidden="true" />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto aspect-square w-full max-w-md rounded-[2rem] border border-white/10 bg-surface p-4 shadow-2xl shadow-accent/10"
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div className="absolute -right-5 -top-5 rounded-2xl bg-accent px-5 py-3 font-heading text-xl font-bold text-background">
            Open to work
          </div>
          {profile?.profile_photo_url ? (
            <img
              src={profile.profile_photo_url}
              alt={`${profile.full_name || 'Chirag'} profile`}
              className="h-full w-full rounded-[1.5rem] object-cover"
              loading="eager"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-[1.5rem] bg-background text-center font-heading text-6xl font-bold text-accent">
              C
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
