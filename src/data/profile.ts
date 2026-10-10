import type { Profile } from '../types'

// All the text on the site lives here. Edit this file and the whole site updates.
export const profile: Profile = {
  name: 'Shahriar Mahmud Anik',
  jobTitle: 'Web Developer',
  location: 'Cardiff, United Kingdom',
  email: 'shahriarmahmud.anikk@gmail.com',
  githubUser: 'shahriarmahmudanik',
  roles: ['Web Developer', 'Front-End Developer', 'WordPress Theme & Plugin Developer'],
  intro:
    "I'm Shahriar Mahmud Anik, a web developer based in Cardiff. I build fast, custom-coded websites with WordPress and JavaScript, and I'm growing into React and TypeScript while studying for an MSc in Advanced Computer Science at the University of South Wales.",
  about: [
    'I started as a web developer in 2022, customising WordPress themes and plugins with PHP, HTML, CSS and JavaScript, and went on to build custom WordPress sites from scratch for different clients.',
    "I'm now moving deeper into front-end engineering: React, TypeScript and modern tooling, alongside my MSc studies in computer science. I care about clean code, accessible interfaces and pages that load quickly.",
  ],
  stats: [
    { value: 2, suffix: '+', label: 'Years building websites professionally' },
    { value: 28, label: 'Public GitHub repositories' },
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
      dates: 'Current',
      current: true,
      points: [
        'Build the systems behind the business: funnels, landing pages, content delivery and lead generation.',
        'Turn complex tech into seamless automation, keeping everything running smoothly for clients.',
      ],
    },
    {
      role: 'Junior Web Developer',
      company: 'Elegance IT Solution',
      dates: 'Aug 2023 – Jul 2024',
      points: [
        'Built unique WordPress websites to client requirements using custom code.',
        'Worked across HTML5, CSS3, JavaScript, PHP, page builders, plugin development and theme development.',
      ],
    },
    {
      role: 'Assistant Executive & Web Developer',
      company: 'Tritech Building Services Ltd.',
      dates: 'May 2022 – Jun 2023',
      points: [
        'Customised WordPress themes and plugins to company requirements.',
        'Maintained the website for performance and security, and ran test plans to find and fix bugs.',
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
    },
    {
      title: 'Professional WordPress websites',
      text: 'Hand-coded themes and plugins instead of bloated templates: fast, secure and built around what your business needs.',
    },
    {
      title: 'SEO content & blog writing',
      text: 'Clear, search-friendly articles and website copy that bring in the right visitors and read well.',
    },
  ],
  links: [
    { label: 'GitHub', url: 'https://github.com/shahriarmahmudanik' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/sm-anik/' },
    { label: 'Instagram', url: 'https://www.instagram.com/shahriar_mahmud_anik/' },
    { label: 'Facebook', url: 'https://www.facebook.com/shahriarmahmud.anik' },
  ],
}
