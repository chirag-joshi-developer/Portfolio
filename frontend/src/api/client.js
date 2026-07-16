// Empty/default = same-origin (Vite/nginx proxy). Set VITE_API_URL only when the API is on another host.
const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

async function request(path, options = {}) {
  const { headers: optionHeaders, ...rest } = options
  const headers = { ...(optionHeaders || {}) }

  // Only set JSON content-type when sending a body (avoids odd GET preflight issues).
  if (rest.body && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json'
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers,
    ...rest,
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `Request failed: ${response.status}`)
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

export function getProfile() {
  return request('/api/profile/')
}

export function getSkills() {
  return request('/api/skills/')
}

export function getInterests() {
  return request('/api/interests/')
}

export function getProjects() {
  return request('/api/projects/')
}

export function getProject(slug) {
  return request(`/api/projects/${encodeURIComponent(slug)}/`)
}

export function getExperience() {
  return request('/api/experience/')
}

export function getEducation() {
  return request('/api/education/')
}

export function getCertificates() {
  return request('/api/certificates/')
}

export function submitContact(payload) {
  return request('/api/contact/', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function getPortfolioData() {
  const [profile, skills, interests, projects, experience, education, certificates] = await Promise.all([
    getProfile(),
    getSkills(),
    getInterests(),
    getProjects(),
    getExperience(),
    getEducation(),
    getCertificates(),
  ])

  return {
    profile,
    skills,
    interests,
    projects,
    experience,
    education,
    certificates,
  }
}
