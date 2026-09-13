import { Project, ExperienceItem, EducationItem, SkillCategory, SocialLink } from '../types';

export const PERSONAL_INFO = {
  name: 'Gourab Shil',
  headline: 'Computer Science & Engineering Graduate | AWS Cloud | Linux | Networking | System Administration | Open to Work',
  heroMainHeadline: 'I keep systems moving forward.',
  heroDescription: 'Hi, I’m Gourab. I’m building my career in IT across cloud computing, DevOps, networking, Linux administration, and tech support — adapting fast, staying focused, and making technology work better.',
  location: 'Bankura, West Bengal, India',
  fullLocation: 'Bankura, West Bengal, India · 722162',
  phone: '+91 9083146034',
  email: 'gourabshil07@gmail.com',
  techLabels: ['CLOUD', 'DEVOPS', 'NETWORKING', 'LINUX', 'SYSTEMS'] as const,
};

export const ABOUT_CONTENT = {
  heading: 'Reliable systems, sharper support.',
  paragraphs: [
    'I’m adaptable by nature and focused on the work in front of me. Whether I’m tracing a network issue, learning a cloud service, automating a repeatable task, or helping someone get unstuck, I look for the clear next step — then make it dependable.',
    'I’m interested in technology that is useful, understandable, and built to earn trust — not just attention.',
    'I stay focused until the job is complete and the result feels satisfying to me. When situations change, I adapt, stay calm, and keep moving toward a practical solution.',
    'My technical skills help me think critically, while clear communication helps me understand the problem, work with people, and resolve it properly.',
  ],
  howIWork: {
    title: 'Steady when it matters.\nSharp when it counts.',
    description: 'Every challenge gets patience, ownership, and a clear next step.',
    cards: [
      {
        number: '01',
        title: 'Focused follow-through',
        description: 'I keep working until the task is complete, tested, and at a standard I’m proud to stand behind.',
      },
      {
        number: '02',
        title: 'Adaptable thinking',
        description: 'I respond to changing situations with an open mind, learning quickly and adjusting without losing direction.',
      },
      {
        number: '03',
        title: 'Clear communication',
        description: 'I listen carefully, explain simply, and collaborate to turn technical problems into workable solutions.',
      },
    ],
  },
  careerProfile: {
    summary: [
      'Computer Science & Engineering graduate with hands-on experience in software development, computer networking, Linux, SQL, cloud computing through academic and personal projects.',
      'Skilled in building practical applications, working with databases, troubleshooting technical issues, and applying cloud and networking concepts to real-world problems. Strong analytical, problem-solving, and communication skills with a passion for continuous learning.',
      'Seeking entry-level opportunities in Software Development, Cloud Engineering, System Administration, Networking, or Technical Support.',
    ],
  },
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'pinnacle-labs',
    company: 'PINNACLE LABS',
    role: 'Intern',
    period: 'January 2026 – February 2026',
    duration: '1 month',
    bullets: [
      'Acted as first point of contact for resolving end-user access and configuration issues on a deployed AWS application, tracking and resolving issues within defined timelines. Documented issues and resolutions clearly, contributing to a knowledge base of recurring fixes for consistent, high-quality support.',
    ],
  },
  {
    id: 'bharat-intern',
    company: 'BHARAT INTERN',
    role: 'Web Development Intern',
    period: 'July 2024 – August 2024',
    duration: '1 month',
    bullets: [
      'Built 3 web applications using JavaScript and REST APIs, translating requirements into working features and configurations.',
      'Coordinated with a remote team to deliver projects on schedule, maintaining documentation of features and changes.',
    ],
  },
  {
    id: 'codsoft',
    company: 'CODSOFT',
    role: 'Python Programming Intern',
    period: 'July 2024 – August 2024',
    duration: '1 month',
    bullets: [
      'Developed Python-based applications including a password generator, calculator, and rock-paper-scissors game.',
    ],
  },
  {
    id: 'gdg-bcrec',
    company: 'GDG ON CAMPUS BCREC',
    role: 'Participant – Google Cloud Study Jam',
    note: 'Formerly GDSC BCREC',
    period: 'August 2023 – November 2023',
    duration: '4 months',
    bullets: [
      'Earned official skill badges for completing Google Cloud learning paths on Compute Engine, IAM, Kubernetes, and Generative AI.',
    ],
  },
  {
    id: 'eduskills-academy',
    company: 'EDUSKILLS ACADEMY',
    role: 'AI-ML Virtual Intern',
    period: 'September 2023 – November 2023',
    duration: '10 weeks',
    bullets: [
      'Learned the foundational concepts of Artificial Intelligence and Machine Learning and gained an understanding of basic AI/ML concepts, workflows, and practical applications, building a strong foundation for further learning and practical development.',
    ],
  },
];

export const EDUCATION_LIST: EducationItem[] = [
  {
    id: 'btech',
    degree: 'B.Tech in Computer Science and Engineering',
    period: '2022 – 2026',
    institution: 'Bengal College of Engineering and Technology (MAKAUT), West Bengal',
    description: 'Bachelor of Technology in Computer Science and Engineering.',
  },
  {
    id: 'hs-12th',
    degree: 'Higher Secondary Education (12th)',
    period: 'Completed 2021',
    institution: 'West Bengal Council of Higher Secondary Education (WBCHSE)',
    description: 'Completed higher secondary education under the West Bengal Council of Higher Secondary Education.',
  },
  {
    id: 'secondary-10th',
    degree: 'Secondary Education (10th)',
    period: 'Completed 2019',
    institution: 'West Bengal Board of Secondary Education (WBBSE)',
    description: 'Completed secondary education under the West Bengal Board of Secondary Education.',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'leafnova-ai',
    number: 'PROJECT 01',
    name: 'Leafnova AI',
    category: 'AI-powered plant care application',
    description: 'An AI-powered plant care companion that combines machine learning, generative AI, APIs, and a Flask backend to help plants thrive.',
    technologies: ['Machine Learning (ML)', 'Gemini AI', 'Groq AI', 'APIs', 'Flask', 'Web Development', 'PostgreSQL'],
    liveUrl: 'https://leafnova-ai.onrender.com/',
  },
  {
    id: 'minidrive',
    number: 'PROJECT 02',
    name: 'Minidrive',
    category: 'Personal cloud storage application',
    description: 'A personal cloud storage platform built around Linux, AWS infrastructure, EC2, S3, DNS, and a Flask application layer.',
    technologies: ['Flask', 'Linux', 'AWS', 'EC2', 'S3', 'DNS'],
    liveUrl: 'https://minidrive-zniy.onrender.com/login',
  },
  {
    id: 'weather-forecast',
    number: 'PROJECT 03',
    name: 'Weather Forecast',
    category: 'Live weather web application',
    description: 'A responsive forecast experience that uses live OpenWeather data to help users quickly understand current conditions and upcoming weather.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'OpenWeather API'],
    liveUrl: 'https://skywatch-gourab.netlify.app/',
  },
  {
    id: 'snake-game',
    number: 'PROJECT 04',
    name: 'Snake Game',
    category: 'Desktop-based browser game',
    description: 'A focused Snake game with a live score board and high-score tracking that keeps every run competitive.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://snake-game-gourab.netlify.app/',
  },
  {
    id: 'password-guessing-game',
    number: 'PROJECT 05',
    name: 'Password Guessing Game',
    category: 'Hint-based guessing game',
    description: 'A lightweight guessing game built around hint-based gameplay, quick decisions, and progressive discovery.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://password-guessing-gourab.netlify.app/',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'IT & Infrastructure',
    subtitle: 'Cloud, Systems & Networks',
    skills: [
      'Cloud Computing',
      'DevOps',
      'Networking',
      'Linux Administration',
      'Tech Support',
      'System Troubleshooting',
    ],
    accentColor: 'from-sky-500/20 to-teal-500/20',
  },
  {
    title: 'Development & Data',
    subtitle: 'Languages, Web & Database',
    skills: [
      'Python',
      'Web Development',
      'HTML',
      'CSS',
      'JavaScript',
      'SQL',
      'MySQL',
    ],
    accentColor: 'from-teal-500/20 to-emerald-500/20',
  },
  {
    title: 'Tools & Workflow',
    subtitle: 'Environments & Collaboration',
    skills: [
      'VS Code',
      'Git',
      'GitHub',
      'Docker',
      'Microsoft Excel',
    ],
    accentColor: 'from-blue-500/20 to-indigo-500/20',
  },
  {
    title: 'Core Technical Competencies',
    subtitle: 'Protocols & Problem Resolution',
    skills: [
      'Microsoft 365',
      'Internet Protocol Suite (TCP/IP)',
      'Troubleshooting',
    ],
    accentColor: 'from-amber-500/20 to-orange-500/20',
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/Gourabshil07',
    ariaLabel: 'Visit Gourab Shil GitHub profile',
    icon: 'github',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/gourab-shil-137004255/',
    ariaLabel: 'Connect with Gourab Shil on LinkedIn',
    icon: 'linkedin',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/gourabshil07/?hl=en',
    ariaLabel: 'Follow Gourab Shil on Instagram',
    icon: 'instagram',
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/gourab.shil.728076',
    ariaLabel: 'View Gourab Shil Facebook profile',
    icon: 'facebook',
  },
  {
    name: 'Email',
    url: 'mailto:gourabshil07@gmail.com',
    ariaLabel: 'Send email to gourabshil07@gmail.com',
    icon: 'mail',
  },
  {
    name: 'Phone',
    url: 'tel:+919083146034',
    ariaLabel: 'Call Gourab Shil at +91 9083146034',
    icon: 'phone',
  },
];
