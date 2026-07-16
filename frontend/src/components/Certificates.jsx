import { HiExternalLink } from 'react-icons/hi'
import SectionWrapper from './SectionWrapper.jsx'

function formatDate(value) {
  if (!value) return 'Issued'
  return new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(new Date(value))
}

function Certificates({ certificates = [] }) {
  return (
    <SectionWrapper id="certificates" eyebrow="Certificates" title="Proof points." description="Credential cards for quick validation and deeper verification links.">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        {certificates.length ? (
          certificates.map((certificate) => (
            <article key={certificate.id} className="overflow-hidden rounded-3xl border border-white/10 bg-surface">
              <div className="aspect-[16/10] bg-background">
                {certificate.certificate_image_url ? (
                  <img
                    src={certificate.certificate_image_url}
                    alt={`${certificate.title} certificate`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center px-6 text-center font-heading text-2xl font-bold text-accent">
                    {certificate.title}
                  </div>
                )}
              </div>
              <div className="p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">{formatDate(certificate.issue_date)}</p>
                <h3 className="mt-3 font-heading text-xl font-bold text-white">{certificate.title}</h3>
                <p className="mt-2 text-zinc-400">{certificate.issuing_organization}</p>
                {certificate.credential_url && (
                  <a
                    href={certificate.credential_url}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-accent transition hover:border-accent"
                  >
                    Verify credential <HiExternalLink aria-hidden="true" />
                  </a>
                )}
              </div>
            </article>
          ))
        ) : (
          <p className="col-span-full rounded-3xl border border-white/10 bg-surface p-8 text-center text-zinc-400">Certificates will appear after they are added in admin.</p>
        )}
      </div>
    </SectionWrapper>
  )
}

export default Certificates
