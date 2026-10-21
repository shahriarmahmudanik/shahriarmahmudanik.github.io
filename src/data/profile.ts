import type { Profile } from '../types'

// All the text on the site lives here. Edit this file and the whole site updates.
export const cvUrl = `${import.meta.env.BASE_URL}Shahriar-Mahmud-Anik-CV.pdf`

export const profile: Profile = {
  name: 'Shahriar Mahmud Anik',
  jobTitle: 'Web Developer',
  location: 'Cardiff, United Kingdom',
  email: 'shahriarmahmud.anikk@gmail.com',
  githubUser: 'shahriarmahmudanik',
  roles: ['Web Developer', 'Front-End Developer', 'WordPress Theme & Plugin Developer'],
  intro:
    "I'm Shahriar Mahmud Anik, a web developer based in Cardiff. I design and build fast, custom-coded websites with WordPress, JavaScript, React and TypeScript, backed by an MSc in Advanced Computer Science at the University of South Wales.",
  about: [
    "I've built websites professionally since 2022: customising WordPress themes and plugins with PHP, HTML, CSS and JavaScript, then delivering bespoke WordPress sites from scratch for clients.",
    "My focus today is front-end engineering with React, TypeScript and modern tooling, strengthened by my MSc in computer science. I deliver clean code, accessible interfaces and pages that load fast.",
  ],
  stats: [
    { value: 2, suffix: '+', label: 'Years building websites professionally' },
    { value: 28, live: 'githubRepos', label: 'Public GitHub repositories' },
    { value: 'MSc', label: 'Advanced Computer Science' },
  ],
  education: [
    {
      degree: 'MSc Advanced Computer Science',
      school: 'University of South Wales',
      dates: 'Current',
      current: true,
      points: [
        'Postgraduate study in computing, including mobile application development and distributed computing.',
      ],
    },
    {
      degree: 'BSc in Computer Science & Engineering',
      school: 'Independent University, Bangladesh',
      dates: '2018 – 2022',
      points: ['Undergraduate degree in Computer Science and Engineering, including university club activities and organising events.'],
    },
    {
      degree: 'Higher Secondary Certificate (Science)',
      school: 'Rajbari Govt. College',
      dates: '2014 – 2016',
      points: [],
    },
  ],
  experience: [
    {
      role: 'Head of Tech & Automation Solutions',
      company: 'AI Alchemy',
      location: 'United Kingdom',
      dates: 'Current',
      current: true,
      points: [
        'Own the technology behind the business: funnels, landing pages, content delivery and lead generation.',
        'Turn complex technology into reliable automation that keeps client operations running smoothly.',
      ],
    },
    {
      role: 'Web Developer',
      company: 'Elegance IT Solution',
      location: 'Bashundhara, Dhaka, Bangladesh',
      dates: 'Aug 2023 – Jul 2024',
      points: [
        'Delivered bespoke WordPress websites to client requirements, built with hand-written code.',
        'Worked across HTML5, CSS3, JavaScript, PHP, page builders, plugin development and theme development.',
      ],
    },
    {
      role: 'Assistant Executive & Web Developer',
      company: 'Tritech Building Services Ltd.',
      location: 'Bashundhara, Dhaka, Bangladesh',
      dates: 'May 2022 – Jun 2023',
      points: [
        'Customised WordPress themes and plugins to company requirements.',
        'Kept the company website fast and secure, and ran test plans to catch and fix bugs before release.',
      ],
    },
  ],
  skills: [
    'JavaScript', 'TypeScript', 'React', 'HTML5', 'CSS3', 'Sass', 'Bootstrap', 'Node.js',
    'PHP', 'WordPress', 'Python', 'Java', 'C++', 'MySQL', 'Git & GitHub', 'Android Studio', 'Linux', 'VS Code',
  ],
  services: [
    {
      title: 'Front-end development',
      text: 'Responsive websites built with HTML, CSS, JavaScript and React, with a focus on performance and clean code.',
      points: ['Responsive, mobile-first layouts', 'React & TypeScript interfaces', 'Accessible, fast-loading pages'],
    },
    {
      title: 'Professional WordPress websites',
      text: 'Hand-coded themes and plugins instead of bloated templates: fast, secure and built around what your business needs.',
      points: ['Custom themes built from scratch', 'Bespoke plugins and integrations', 'Speed, security and easy editing'],
    },
    {
      title: 'SEO content & blog writing',
      text: 'Clear, search-friendly articles and website copy that bring in the right visitors and read well.',
      points: ['Keyword-researched blog articles', 'Website and landing-page copy', 'On-page SEO basics'],
    },
  ],
  links: [
    { label: 'GitHub', url: 'https://github.com/shahriarmahmudanik' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/sm-anik/' },
    { label: 'Instagram', url: 'https://www.instagram.com/shahriar_mahmud_anik/' },
    { label: 'Facebook', url: 'https://www.facebook.com/shahriarmahmud.anik' },
  ],
}
