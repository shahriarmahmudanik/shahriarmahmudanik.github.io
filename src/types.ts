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
  promo?: boolean // the preview image is a wide promo graphic: show it whole on the project card
  gallery?: string[] // extra screenshots
  links?: { label: string; url: string }[] // extra links, e.g. a backend repo
  repo?: string // "?" means optional
  live?: string
}

export interface Stat {
  value: number | string
  suffix?: string
  label: string
  live?: 'githubRepos' // value is replaced by the live GitHub public repo count
}

export interface Job {
  role: string
  company: string
  location?: string
  dates: string
  current?: boolean
  points: string[]
}

export interface Education {
  degree: string
  school: string
  dates: string
  current?: boolean
  points: string[]
}

export interface Service {
  title: string
  text: string
  points?: string[] // short bullet list shown in the detail panel
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
  education: Education[]
  experience: Job[]
  skills: string[]
  services: Service[]
  links: { label: string; url: string }[]
}
