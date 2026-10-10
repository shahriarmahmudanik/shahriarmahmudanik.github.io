// Shared TypeScript types. Defining the "shape" of your data once means the
// editor (and the compiler) will warn you if you forget a field or mistype a name.

export type ProjectType = 'Web' | 'WordPress' | 'React' | 'Mobile' | 'Software'

export interface Project {
  slug: string // used in the URL: /projects/agency-website
  title: string
  summary: string // one line shown on the card
  description: string[] // paragraphs shown on the detail page
  type: ProjectType
  image?: string // preview picture (set automatically from src/assets/projects/<slug>.svg)
  tech: string[]
  featured?: boolean // shown in the big banner at the top of the Projects page
  gallery?: string[] // extra screenshots
  links?: { label: string; url: string }[] // extra links, e.g. a backend repo
  repo?: string // "?" means optional
  live?: string
}

export interface Stat {
  value: number | string
  suffix?: string
  label: string
}

export interface Job {
  role: string
  company: string
  dates: string
  points: string[]
}

export interface Service {
  title: string
  text: string
}

export interface Profile {
  name: string
  jobTitle: string
  location: string
  email: string
  githubUser: string
  roles: string[]
  intro: string
  about: string[]
  stats: Stat[]
  experience: Job[]
  skills: string[]
  services: Service[]
  links: { label: string; url: string }[]
}
