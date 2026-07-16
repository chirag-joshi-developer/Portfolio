import { useEffect, useState } from 'react'
import { getPortfolioData } from '../api/client.js'
import About from '../components/About.jsx'
import Certificates from '../components/Certificates.jsx'
import Contact from '../components/Contact.jsx'
import Education from '../components/Education.jsx'
import Experience from '../components/Experience.jsx'
import Footer from '../components/Footer.jsx'
import Hero from '../components/Hero.jsx'
import Interests from '../components/Interests.jsx'
import Navbar from '../components/Navbar.jsx'
import Projects from '../components/Projects.jsx'
import Skills from '../components/Skills.jsx'

function Home() {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    getPortfolioData()
      .then((payload) => {
        if (mounted) {
          setData(payload)
        }
      })
      .catch(() => {
        if (mounted) {
          setError('Unable to load portfolio content. Please check that the Django API is running.')
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false)
        }
      })

    return () => {
      mounted = false
    }
  }, [])

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-background px-5 text-center">
        <div>
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-accent" />
          <p className="mt-6 font-heading text-2xl font-bold text-white">Loading Chirag's portfolio...</p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="grid min-h-screen place-items-center bg-background px-5 text-center">
        <div className="max-w-lg rounded-3xl border border-white/10 bg-surface p-8">
          <p className="font-heading text-2xl font-bold text-white">Content unavailable</p>
          <p className="mt-3 leading-7 text-zinc-400">{error}</p>
        </div>
      </main>
    )
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero profile={data.profile} />
        <About profile={data.profile} />
        <Skills skills={data.skills} />
        <Projects projects={data.projects} />
        <Experience experience={data.experience} />
        <Education education={data.education} />
        <Certificates certificates={data.certificates} />
        <Interests interests={data.interests} />
        <Contact profile={data.profile} />
      </main>
      <Footer profile={data.profile} />
    </>
  )
}

export default Home
