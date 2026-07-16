import { useEffect, useState } from 'react'

export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || '')

  useEffect(() => {
    const observers = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)
      .map((section) => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(section.id)
            }
          },
          { rootMargin: '-35% 0px -55% 0px', threshold: 0.01 },
        )
        observer.observe(section)
        return observer
      })

    return () => observers.forEach((observer) => observer.disconnect())
  }, [sectionIds])

  return activeSection
}
