import { motion } from 'framer-motion'

function SectionWrapper({ id, eyebrow, title, description, children, className = '' }) {
  return (
    <motion.section
      id={id}
      className={`scroll-mt-28 px-5 py-16 sm:px-8 lg:px-12 ${className}`}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      {(eyebrow || title || description) && (
        <div className="mx-auto mb-10 max-w-3xl text-center">
          {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-accent">{eyebrow}</p>}
          {title && <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">{title}</h2>}
          {description && <p className="mt-4 text-base leading-7 text-zinc-400">{description}</p>}
        </div>
      )}
      {children}
    </motion.section>
  )
}

export default SectionWrapper
