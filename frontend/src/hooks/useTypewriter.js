import { useEffect, useState } from 'react'

export function useTypewriter(words = [], speed = 80, pause = 1200) {
  const [wordIndex, setWordIndex] = useState(0)
  const [letterIndex, setLetterIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!words.length) {
      return undefined
    }

    const currentWord = words[wordIndex % words.length]
    const delay = deleting ? speed / 2 : letterIndex === currentWord.length ? pause : speed

    const timeout = window.setTimeout(() => {
      if (!deleting && letterIndex < currentWord.length) {
        setLetterIndex((value) => value + 1)
      } else if (!deleting) {
        setDeleting(true)
      } else if (letterIndex > 0) {
        setLetterIndex((value) => value - 1)
      } else {
        setDeleting(false)
        setWordIndex((value) => (value + 1) % words.length)
      }
    }, delay)

    return () => window.clearTimeout(timeout)
  }, [deleting, letterIndex, pause, speed, wordIndex, words])

  if (!words.length) {
    return ''
  }

  return words[wordIndex % words.length].slice(0, letterIndex)
}
