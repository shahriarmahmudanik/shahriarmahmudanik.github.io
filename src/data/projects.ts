import type { Project } from '../types'

// Starter projects taken from the GitHub profile.
// TODO (you): add a live link and a few sentences about what you built, why, and what you learned.
// Recruiters read these pages, so concrete details make a big difference.
// Preview pictures live in src/assets/projects/<slug>.svg - drop a real screenshot there (same name) to replace a dummy one.
const images = import.meta.glob<string>('../assets/projects/*.svg', { eager: true, query: '?url', import: 'default' })
const imageFor = (slug: string) => images[`../assets/projects/${slug}.svg`]
const shots = import.meta.glob<string>('../assets/projects/shots/*.jpg', { eager: true, query: '?url', import: 'default' })
const shot = (slug: string) => shots[`../assets/projects/shots/${slug}.jpg`]
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
    slug: 'seek-spirituality',
    title: 'Seek Spirituality',
    summary: 'A client website for a spiritual business coaching brand, with services, blog and shop.',
    description: [
      'A website I built for a client who combines business expertise with spiritual practice. It presents their services, benefits and blog, and includes a shop with a cart.',
      'Built on WordPress with a custom look matched to the brand: a gold and midnight-blue palette and a full-width hero.',
    ],
    type: 'WordPress',
    tech: ['WordPress', 'E-commerce', 'CSS'],
    image: shot('seek-spirituality'),
    live: 'https://seekspirituality.com/',
  },
  {
    slug: 'ai-alchemy',
    title: 'AI Alchemy',
    summary: 'A client website for an AI content-systems business, with services, blog and shop.',
    description: [
      'A website I built for a client offering done-for-you AI systems to help business owners scale. It covers services, a resource shop (the Alchemy Vault), a blog and a contact page.',
      'Built on WordPress with a dark and gold design, a cookie-consent banner and a cart for the shop.',
    ],
    type: 'WordPress',
    tech: ['WordPress', 'E-commerce', 'CSS'],
    image: shot('ai-alchemy'),
    live: 'https://ai-alchemy.co.uk/',
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
  {
    slug: 'hvac-websites',
    title: 'HVAC Websites with WordPress',
    summary: 'A family of WordPress sites for HVAC and building-services companies in Bangladesh.',
    description: [
      'Websites built with WordPress to give potential clients information and resources about HVAC systems and services.',
      'I wrote custom code in HTML, CSS, Bootstrap and JavaScript where the page builders fell short, and optimised each site for mobile responsiveness and user interaction.',
    ],
    type: 'WordPress',
    tech: ['WordPress', 'HTML', 'CSS', 'Bootstrap', 'JavaScript'],
    gallery: ['hvac-bangladesh', 'hvac-chittagong', 'air-condition-bd', 'chiller-bd', 'tritech'].map(shot),
    live: 'https://hvacbangladesh.com/',
    links: [
      { label: 'HVAC Chittagong', url: 'https://hvacchittagong.com/' },
      { label: 'Air Condition BD', url: 'https://aircondition.com.bd/' },
      { label: 'Chiller BD', url: 'http://chiller.com.bd/' },
      { label: 'Tritech BD', url: 'https://www.tritechbd.com/' },
    ],
  },
  {
    slug: 'ecommerce-google-sites',
    title: 'E-commerce Website with Google Sites',
    summary: 'A fashion storefront (Hawkerr) built on Google Sites.',
    description: [
      'An e-commerce website built with Google Sites to sell a variety of products to customers worldwide.',
      "I designed and customised the site's layout, themes and templates to improve the user experience and brand recognition.",
    ],
    type: 'Web',
    tech: ['Google Sites', 'UI design'],
    image: shot('ecommerce'),
    live: 'https://sites.google.com/view/hawkerr/home',
  },
  {
    slug: 'cafe-shop-website',
    title: 'Cafe Shop Website',
    summary: 'A responsive cafe website with a PHP and MySQL back end.',
    description: [
      'I designed the front end with HTML, CSS and JavaScript to give customers a responsive, easy-to-use experience.',
      'The back end is written in PHP to handle the business logic, with MySQL managing the database and tuned for performance.',
    ],
    type: 'Web',
    tech: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    repo: 'https://github.com/shahriarmahmudanik/Cafe_Shop_Project',
  },
  {
    slug: 'weather-website',
    title: 'Weather Website',
    summary: 'Search weather conditions for any location using the OpenWeatherMap API.',
    description: [
      'A weather website where users search for current conditions in different locations.',
      'The front end uses Bootstrap and jQuery for a clean interface; a PHP back end retrieves data from the OpenWeatherMap API and serves real-time updates.',
    ],
    type: 'Web',
    tech: ['PHP', 'Bootstrap', 'jQuery', 'REST API'],
    repo: 'https://github.com/shahriarmahmudanik/weather-website',
  },
  {
    slug: 'android-apps',
    title: 'Android Applications',
    summary: 'Weather, Calculator and Todo apps built with Java and Android Studio.',
    description: [
      'Several Android applications developed in Java with the Android SDK and Android Studio.',
      'Features include real-time weather retrieval from a RESTful API, calculator operations and task management.',
    ],
    type: 'Mobile',
    tech: ['Java', 'Android SDK', 'Android Studio', 'REST API'],
    repo: 'https://github.com/shahriarmahmudanik/ToDo_Application',
    links: [{ label: 'Calculator app', url: 'https://github.com/shahriarmahmudanik/Simple-Calculator_Android-App' }],
  },
  {
    slug: 'student-monitoring-system',
    title: 'Student Monitoring System',
    summary: 'A Django system tracking student attendance, grades and performance.',
    description: [
      'A student monitoring system with a Python Django back end, a MySQL database and an HTML, CSS, Bootstrap and JavaScript front end.',
      'It tracks attendance, grades and other data, giving teachers and administrators real-time monitoring and reports generated from database queries and analytics.',
    ],
    type: 'Software',
    tech: ['Python', 'Django', 'MySQL', 'Bootstrap', 'JavaScript'],
  },
]

export const projects: Project[] = base.map((p) => ({ ...p, image: p.image ?? (p.featured ? p.gallery?.[0] : imageFor(p.slug) ?? p.gallery?.[0]) }))

export function getProject(slug: string | undefined): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
