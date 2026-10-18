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
    summary: 'Cross-platform Flutter app for workout tracking, 30-day challenges and progress analytics.',
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
    summary: 'Brand website for a spiritual business coach, with services, blog and online shop.',
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
    summary: 'Marketing and e-commerce website for an AI content-systems agency, with a resource shop and blog.',
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
    slug: 'mongstar-music',
    title: 'Mongstar Music',
    summary: 'Official artist website for soca performer Mongstar, featuring releases, live dates and bookings.',
    description: [
      'A website I built for Saint Lucian artist, songwriter and performer Mongstar. It promotes the latest release, with links to listen and watch, upcoming live shows, an about section and a booking form.',
      'Built on WordPress with the Astra theme and a bold, music-focused design.',
    ],
    type: 'WordPress',
    tech: ['WordPress', 'Astra', 'CSS'],
    image: shot('mongstar-music'),
    live: 'https://mongstarmusic.com/',
  },
  {
    slug: 'the-whole-woman',
    title: 'The Whole Woman',
    summary: 'Conversion-focused website for a women\'s wellness programme, with stories and sign-up.',
    description: [
      'A website I built for a wellness coach with 40 years in skin and wellness. It presents The Whole Woman philosophy, what is inside the programme, stories from the circle and a call to join.',
      'Built on WordPress with the Flatsome theme.',
    ],
    type: 'WordPress',
    tech: ['WordPress', 'Flatsome', 'CSS'],
    image: shot('the-whole-woman'),
    live: 'https://www.thewholewomen.life/',
  },
  {
    slug: 'agency-website',
    title: 'Agency Website',
    summary: 'Responsive one-page agency landing site built with Bootstrap.',
    description: ['A one-page landing website for a digital agency, built with HTML, CSS and Bootstrap.'],
    type: 'Web',
    tech: ['HTML', 'CSS', 'Bootstrap'],
    repo: 'https://github.com/shahriarmahmudanik/Bootstrap_project-Agency-Website',
  },
  {
    slug: 'official-portfolio',
    title: 'My Official Portfolio',
    summary: 'Earlier personal portfolio showcasing projects, skills and contact details.',
    description: ['My earlier personal portfolio website, built with HTML and CSS before this React version.'],
    type: 'Web',
    tech: ['HTML', 'CSS'],
    repo: 'https://github.com/shahriarmahmudanik/My_Official_Portifolio',
  },
  {
    slug: 'digital-cv',
    title: 'Digital CV',
    summary: 'Responsive web-based CV presenting experience, skills and education.',
    description: ['A CV presented as a web page, so it can be shared with a single link.'],
    type: 'Web',
    tech: ['HTML', 'CSS'],
    repo: 'https://github.com/shahriarmahmudanik/My-Digital-CV',
  },
  {
    slug: 'one-page-template',
    title: 'One-Page Template Website',
    summary: 'Reusable, responsive one-page website template.',
    description: ['A reusable one-page website template that can be adapted for different small businesses.'],
    type: 'Web',
    tech: ['HTML'],
    repo: 'https://github.com/shahriarmahmudanik/One-Page-tamplate-website',
  },
  {
    slug: 'database-project',
    title: 'Database Project',
    summary: 'Relational database design and implementation for a university group project.',
    description: ['A database-driven project completed as part of my university studies.'],
    type: 'Software',
    tech: ['Python', 'SQL'],
    repo: 'https://github.com/shahriarmahmudanik/Database_Project_Final',
  },
  {
    slug: 'resume',
    title: 'My Resume',
    summary: 'Clean, responsive online resume built with HTML and CSS.',
    description: ['A styled online version of my resume.'],
    type: 'Web',
    tech: ['CSS'],
    repo: 'https://github.com/shahriarmahmudanik/My_Resume',
  },
  {
    slug: 'hvac-bangladesh',
    title: 'HVAC Bangladesh',
    summary: 'Corporate WordPress website for an HVAC and building-services provider in Bangladesh.',
    description: [
      'A website built with WordPress to give potential clients information and resources about HVAC systems and services.',
      'I wrote custom code in HTML, CSS, Bootstrap and JavaScript where the page builders fell short, and optimised the site for mobile responsiveness and user interaction.',
    ],
    type: 'WordPress',
    tech: ['WordPress', 'HTML', 'CSS', 'Bootstrap', 'JavaScript'],
    image: shot('hvac-bangladesh'),
    live: 'https://hvacbangladesh.com/',
  },
  {
    slug: 'hvac-chittagong',
    title: 'HVAC Chittagong',
    summary: 'Service-focused WordPress website for an HVAC company based in Chittagong.',
    description: [
      'A website built with WordPress to give potential clients information and resources about HVAC systems and services.',
      'I wrote custom code in HTML, CSS, Bootstrap and JavaScript where the page builders fell short, and optimised the site for mobile responsiveness and user interaction.',
    ],
    type: 'WordPress',
    tech: ['WordPress', 'HTML', 'CSS', 'Bootstrap', 'JavaScript'],
    image: shot('hvac-chittagong'),
    live: 'https://hvacchittagong.com/',
  },
  {
    slug: 'air-condition-bd',
    title: 'Air Condition BD',
    summary: 'WordPress website presenting air-conditioning products and services in Bangladesh.',
    description: [
      'A website built with WordPress to give potential clients information and resources about HVAC systems and services.',
      'I wrote custom code in HTML, CSS, Bootstrap and JavaScript where the page builders fell short, and optimised the site for mobile responsiveness and user interaction.',
    ],
    type: 'WordPress',
    tech: ['WordPress', 'HTML', 'CSS', 'Bootstrap', 'JavaScript'],
    image: shot('air-condition-bd'),
    live: 'https://aircondition.com.bd/',
  },
  {
    slug: 'chiller-bd',
    title: 'Chiller BD',
    summary: 'WordPress website presenting chiller systems and HVAC solutions in Bangladesh.',
    description: [
      'A website built with WordPress to give potential clients information and resources about HVAC systems and services.',
      'I wrote custom code in HTML, CSS, Bootstrap and JavaScript where the page builders fell short, and optimised the site for mobile responsiveness and user interaction.',
    ],
    type: 'WordPress',
    tech: ['WordPress', 'HTML', 'CSS', 'Bootstrap', 'JavaScript'],
    image: shot('chiller-bd'),
    live: 'http://chiller.com.bd/',
  },
  {
    slug: 'tritech',
    title: 'Tritech BD',
    summary: 'Corporate WordPress website for Tritech BD, an engineering and building-services company.',
    description: [
      'A website built with WordPress to give potential clients information and resources about HVAC systems and services.',
      'I wrote custom code in HTML, CSS, Bootstrap and JavaScript where the page builders fell short, and optimised the site for mobile responsiveness and user interaction.',
    ],
    type: 'WordPress',
    tech: ['WordPress', 'HTML', 'CSS', 'Bootstrap', 'JavaScript'],
    image: shot('tritech'),
    live: 'https://www.tritechbd.com/',
  },
  {
    slug: 'ecommerce-google-sites',
    title: 'E-commerce Website with Google Sites',
    summary: 'Fashion storefront for the Hawkerr brand, built on Google Sites.',
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
    summary: 'Responsive cafe website with a PHP and MySQL back end.',
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
    summary: 'Live weather search for any location, powered by the OpenWeatherMap API.',
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
    summary: 'Native Android apps in Java: weather, calculator and to-do list.',
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
    summary: 'Django platform for tracking student attendance, grades and performance.',
    description: [
      'A student monitoring system with a Python Django back end, a MySQL database and an HTML, CSS, Bootstrap and JavaScript front end.',
      'It tracks attendance, grades and other data, giving teachers and administrators real-time monitoring and reports generated from database queries and analytics.',
    ],
    type: 'Software',
    tech: ['Python', 'Django', 'MySQL', 'Bootstrap', 'JavaScript'],
  },
  {
    slug: 'ecommerce-microservices',
    title: 'E-Commerce Microservice System',
    summary: 'Containerised e-commerce platform with load balancing, caching and separate admin services.',
    description: [
      'A coursework project that splits an online shop into containerised services: HAProxy round-robin load balancing across three PHP/Apache customer web servers, plus a separate admin web server for managing inventory.',
      'Two Flask APIs sit in front of a MySQL database (one read-only with caching, one read/write for admins), with Redis caching database queries. The whole stack starts with Docker Compose.',
    ],
    type: 'Software',
    tech: ['Docker', 'PHP', 'Flask', 'MySQL', 'Redis', 'HAProxy'],
    repo: 'https://github.com/shahriarmahmudanik/E-Commerce-Microservice-System',
  },
  {
    slug: 'music-library-api',
    title: 'Music Library Management',
    summary: 'Full-stack music library: secure FastAPI back end with a React interface.',
    description: [
      'A RESTful API built with FastAPI and SQLAlchemy for managing a music library of genres, artists, albums and tracks, with JWT-based authentication, MySQL databases, seed data and automated tests.',
      'A React front end lets users sign in and browse and manage albums, artists, genres and tracks.',
    ],
    type: 'Software',
    tech: ['Python', 'FastAPI', 'SQLAlchemy', 'MySQL', 'JWT', 'React'],
    repo: 'https://github.com/shahriarmahmudanik/Music-Library-Management',
    links: [{ label: 'Frontend', url: 'https://github.com/shahriarmahmudanik/music_management_frontend' }],
  },
  {
    slug: 'password-manager',
    title: 'Password Manager',
    summary: 'C++ command-line password manager with authentication, encrypted storage and a generator.',
    description: [
      'A console-based password manager written in C++ with user registration and login, and an admin account that can view all users.',
      'Users can add, view, search, edit and delete credentials, which are stored encrypted with a simple Caesar cipher and sorted by last update, and generate random passwords.',
    ],
    type: 'Software',
    tech: ['C++', 'OOP', 'Encryption'],
    repo: 'https://github.com/shahriarmahmudanik/PasswordManager',
  },
  {
    slug: 'collision-detection',
    title: 'Collision Detection',
    summary: 'C++ 2D physics simulation of ball collisions with boundaries and obstacles.',
    description: [
      'A C++ physics simulation built from small classes for 2D vectors, balls, boundaries and obstacles, with a Makefile for building.',
    ],
    type: 'Software',
    tech: ['C++', 'OOP', 'Physics'],
    repo: 'https://github.com/shahriarmahmudanik/Collision_Detection',
  },
  {
    slug: 'podcast-ui-kit',
    title: 'Podcast UI Kit',
    summary: 'Responsive podcast landing page and UI kit built with HTML and CSS.',
    description: [
      'A front-end UI kit for a podcast site, built with HTML and CSS and published on GitHub Pages.',
    ],
    type: 'Web',
    tech: ['HTML', 'CSS'],
    repo: 'https://github.com/shahriarmahmudanik/Podcast_UI_Kit',
    live: 'https://anik904.github.io/Podcast_UI_Kit/',
  },
  {
    slug: 'profile-hover-effect',
    title: 'Profile CSS Hover Effect',
    summary: 'Interactive profile card with a pure CSS hover animation.',
    description: [
      'A small front-end experiment: a profile card with hover effects done entirely in CSS, published on GitHub Pages.',
    ],
    type: 'Web',
    tech: ['HTML', 'CSS'],
    repo: 'https://github.com/shahriarmahmudanik/Profile-CSS-Hover-Effect',
    live: 'https://anik904.github.io/Profile-CSS-Hover-Effect/',
  },
  {
    slug: 'color-picker',
    title: 'Color Picker',
    summary: 'React application for selecting and previewing colours.',
    description: ['A React app built with Create React App as practice with components and state.'],
    type: 'React',
    tech: ['React', 'JavaScript'],
    repo: 'https://github.com/shahriarmahmudanik/Color-Picker',
  },
  {
    slug: 'validator-app',
    title: 'Validator App',
    summary: 'React application demonstrating form input validation.',
    description: ['A React app built with Create React App as practice with forms and validation.'],
    type: 'React',
    tech: ['React', 'JavaScript'],
    repo: 'https://github.com/shahriarmahmudanik/Validator-App',
  },
]

export const projects: Project[] = base.map((p) => ({ ...p, image: p.image ?? (p.featured ? p.gallery?.[0] : imageFor(p.slug) ?? p.gallery?.[0]) }))

export function getProject(slug: string | undefined): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
