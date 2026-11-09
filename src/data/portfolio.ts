/**
 * All customizable portfolio content lives here.
 * Edit this file to change text, links and projects — components only render it.
 */

export const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId = (typeof sections)[number]['id']

export interface Profile {
  name: string
  role: string
  tagline: string
  location: string
  email: string
}

export interface SkillGroup {
  title: string
  items: string[]
}

export interface Project {
  title: string
  description: string
  tech: string[]
  liveUrl?: string
  sourceUrl?: string
  /** Rendered first and larger in the Projects section. */
  featured?: boolean
}

export type SocialKind = 'email' | 'github' | 'linkedin' | 'website'

export interface SocialLink {
  kind: SocialKind
  label: string
  href: string
}

export const profile: Profile = {
  name: 'Your Name',
  role: 'Frontend Developer',
  tagline:
    'I build fast, accessible web experiences with a focus on interactive 3D and thoughtful motion.',
  location: 'City, Country',
  email: 'hello@example.com',
}

export const about: string[] = [
  'Placeholder: a short paragraph about who you are, what you focus on and what kind of problems you enjoy solving.',
  'Placeholder: a second paragraph about your experience — roles, studies, or notable things you have shipped.',
]

export const skillGroups: SkillGroup[] = [
  { title: 'Languages', items: ['TypeScript', 'JavaScript', 'HTML', 'CSS', 'Python'] },
  { title: 'Frontend', items: ['React', 'Tailwind CSS', 'Vite', 'GSAP'] },
  { title: '3D & Graphics', items: ['Three.js', 'React Three Fiber', 'Drei', 'Blender'] },
  { title: 'Tooling', items: ['Git', 'Node.js', 'Figma', 'Vitest'] },
]

export const projects: Project[] = [
  {
    title: 'Project One',
    description: 'Placeholder description of the problem this project solves and your role in it.',
    tech: ['React', 'TypeScript', 'Three.js'],
    liveUrl: 'https://example.com',
    sourceUrl: 'https://github.com/',
    featured: true,
  },
  {
    title: 'Project Two',
    description: 'Placeholder description highlighting an interesting technical challenge.',
    tech: ['Node.js', 'Tailwind CSS'],
    sourceUrl: 'https://github.com/',
  },
  {
    title: 'Project Three',
    description: 'Placeholder description — what you learned and what the outcome was.',
    tech: ['GSAP', 'Vite'],
    liveUrl: 'https://example.com',
  },
]

export const socials: SocialLink[] = [
  { kind: 'email', label: 'Email', href: `mailto:${profile.email}` },
  { kind: 'github', label: 'GitHub', href: 'https://github.com/' },
  { kind: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/' },
]

/** Interface copy: headings, buttons and small labels rendered by the sections. */
export const copy = {
  hero: {
    greeting: 'Hi, I’m',
    primaryCta: { label: 'View projects', href: '#projects' },
    secondaryCta: { label: 'Get in touch', href: '#contact' },
    scrollCue: 'Scroll to explore',
  },
  about: { eyebrow: 'About', title: 'Background & experience', locationLabel: 'Based in' },
  skills: { eyebrow: 'Skills', title: 'Tools I work with' },
  projects: {
    eyebrow: 'Projects',
    title: 'Selected work',
    featuredLabel: 'Featured',
    liveLabel: 'Live',
    sourceLabel: 'Source',
    techLabel: 'Technologies',
    liveDemoLabel: 'live demo',
    sourceCodeLabel: 'source code',
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Let’s build something',
    intro:
      'I’m open to new opportunities and collaborations. The fastest way to reach me is by email.',
    elsewhereLabel: 'Elsewhere',
  },
  footer: { credits: 'Built with React, Three.js and GSAP.' },
  nav: { label: 'Primary', openMenu: 'Open menu', closeMenu: 'Close menu' },
  a11y: { skipToContent: 'Skip to content', opensInNewTab: '(opens in new tab)' },
} as const
