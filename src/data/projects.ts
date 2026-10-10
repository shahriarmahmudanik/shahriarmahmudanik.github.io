import type { Project } from '../types'

// Starter projects taken from the GitHub profile.
// TODO (you): add a live link and a few sentences about what you built, why, and what you learned.
// Recruiters read these pages, so concrete details make a big difference.
// Preview pictures live in src/assets/projects/<slug>.svg - drop a real screenshot there (same name) to replace a dummy one.
const images = import.meta.glob<string>('../assets/projects/*.svg', { eager: true, query: '?url', import: 'default' })
const imageFor = (slug: string) => images[`../assets/projects/${slug}.svg`]
const fitness = Object.entries(
  import.meta.glob<string>('../assets/projects/fitness/*.jpg', { eager: true, query: '?url', import: 'default' }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url)

const base: Project[] = [
  {
    slug: 'ai-fitness-tracker',
    title: 'AI-Powered Fitness Tracker',
    summary: 'A Flutter mobile app for tracking workouts, with a 30-day challenge and analytics.',
    description: [
      'A mobile fitness app built with Flutter and Dart, with a Python backend. It tracks pushups, squats and jumping jacks rep by rep and shows daily progress as a goal ring and per-exercise progress bars.',
      'A 30-day challenge adds a day-by-day timeline, milestones (Day 1, 7, 14, 21 and 30) and a streak counter, and an analytics tab shows total workouts, total reps, exercise distribution and a 7-day activity chart.',
    ],
    type: 'Mobile',
    tech: ['Flutter', 'Dart', 'Python'],
    featured: true,
    gallery: fitness,
    repo: 'https://github.com/shahriarmahmudanik/AI-Powered-Fitness-Tracking-Application',
    links: [{ label: 'Backend', url: 'https://github.com/shahriarmahmudanik/AI-Powered-Fitness-Tracking-Application-backend' }],
  },
  {
    slug: 'agency-website',
    title: 'Agency Website',
    summary: 'A one-page agency landing website built with Bootstrap.',
    description: ['A one-page landing website for a digital agency, built with HTML, CSS and Bootstrap.'],
    type: 'Web',
    tech: ['HTML', 'CSS', 'Bootstrap'],
    repo: 'https://github.com/shahriarmahmudanik/Bootstrap_project-Agency-Website',
  },
  {
    slug: 'official-portfolio',
    title: 'My Official Portfolio',
    summary: 'An earlier personal portfolio website.',
    description: ['My earlier personal portfolio website, built with HTML and CSS before this React version.'],
    type: 'Web',
    tech: ['HTML', 'CSS'],
    repo: 'https://github.com/shahriarmahmudanik/My_Official_Portifolio',
  },
  {
    slug: 'digital-cv',
    title: 'Digital CV',
    summary: 'A web-based CV / resume.',
    description: ['A CV presented as a web page, so it can be shared with a single link.'],
    type: 'Web',
    tech: ['HTML', 'CSS'],
    repo: 'https://github.com/shahriarmahmudanik/My-Digital-CV',
  },
  {
    slug: 'one-page-template',
    title: 'One-Page Template Website',
    summary: 'A reusable one-page website template.',
    description: ['A reusable one-page website template that can be adapted for different small businesses.'],
    type: 'Web',
    tech: ['HTML'],
    repo: 'https://github.com/shahriarmahmudanik/One-Page-tamplate-website',
  },
  {
    slug: 'database-project',
    title: 'Database Project',
    summary: 'A database-driven university project.',
    description: ['A database-driven project completed as part of my university studies.'],
    type: 'Software',
    tech: ['Python', 'SQL'],
    repo: 'https://github.com/shahriarmahmudanik/Database_Project_Final',
  },
  {
    slug: 'resume',
    title: 'My Resume',
    summary: 'A styled online resume.',
    description: ['A styled online version of my resume.'],
    type: 'Web',
    tech: ['CSS'],
    repo: 'https://github.com/shahriarmahmudanik/My_Resume',
  },
  // TODO (you): the two samples below are placeholders to show the categories - replace or delete them.
  {
    slug: 'sample-wordpress-theme',
    title: 'Sample WordPress Theme',
    summary: 'Placeholder: a custom WordPress theme.',
    description: ['Placeholder project. Replace with a real WordPress theme or plugin you built.'],
    type: 'WordPress',
    tech: ['PHP', 'WordPress', 'CSS'],
  },
  {
    slug: 'sample-react-dashboard',
    title: 'Sample React Dashboard',
    summary: 'Placeholder: a React and TypeScript dashboard.',
    description: ['Placeholder project. Replace with a real React app you built.'],
    type: 'React',
    tech: ['React', 'TypeScript'],
  },
]

export const projects: Project[] = base.map((p) => ({ ...p, image: p.featured ? p.gallery?.[0] : imageFor(p.slug) }))

export function getProject(slug: string | undefined): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
