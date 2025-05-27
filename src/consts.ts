import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: 'Tổ Sư Thiền',
  description:
    "",
  href: 'https://cojocarudavid.me',
  author: 'Patriarchal Zen',
  locale: 'en-US',
  location: 'India',
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/',
    label: 'home',
  },
  {
    href: '/projects',
    label: 'projects',
  },
  {
    href: '/blog',
    label: 'blog',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/cojocaru-david?ref=personal-website',
    label: 'GitHub',
  },
  {
    href: 'mailto:contact@cojocarudavid.me',
    label: 'Email',
  },
  {
    href: '+40 764 132 266',
    label: 'Phone',
  },
  {
    href: 'https://www.instagram.com/david._.cojo?ref=personal-website',
    label: 'Instagram',
  },
  {
    href: '/rss.xml',
    label: 'RSS',
  },
]

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  Instagram: 'lucide:instagram',
  Phone: 'lucide:phone',
  Email: 'lucide:mail',
  RSS: 'lucide:rss',
}

export interface Category {
  text: string
  logo: string
}

export type Technologies = {
  'Sắc Ấm': Category[]
  'Thọ Ấm': Category[]
  'Tưởng Ấm': Category[]
  'Hành Ấm': Category[]
  'Thức Ấm': Category[]
  'Sơ Quan': Category[]
  'Trùng Quan': Category[]
  'Lao Quan': Category[]
}

export const technologies: Technologies = {
  'Sắc Ấm': [
    { text: 'Phá Ngã Chấp', logo: 'mdi:language-html5' },
    { text: 'Phá Nhân Chấp', logo: 'mdi:language-javascript' },
    { text: 'Phá Chúng Sanh Chấp', logo: 'mdi:language-css3' },
    { text: 'Phá Thọ Giả Chấp', logo: 'mdi:language-php' },
  ],
  'Thọ Ấm': [
    { text: 'Phá Cảm Thọ Chấp', logo: 'mdi:visual-studio-code' },
    { text: 'Git', logo: 'mdi:git' },
  ],
  'Tưởng Ấm': [
    { text: 'Phá Vọng Tưởng Chấp', logo: 'mdi:digital-ocean' },
    { text: 'Cloudflare', logo: 'cib:cloudflare' },
    { text: 'Netlify', logo: 'cib:netliflanguage-css3'},
    ],
  'Hành Ấm': [
    { text: 'Phá Vọng Động Chấp', logo: 'mdi:windows' },
    { text: 'Ubuntu', logo: 'mdi:ubuntu' },
  ],
  'Thức Ấm': [
    { text: 'Phá Phân Biệt Chấp', logo: 'mdi:language-lua' },
    { text: 'Golang', logo: 'mdi:language-go' },
    { text: 'Node.js', logo: 'mdi:nodejs' },
  ],
  'Sơ Quan': [
    { text: 'Apache', logo: 'cib:apache' },
    { text: 'Nginx', logo: 'cib:nginx' },
  ],
  'Trùng Quan': [
    { text: 'MySQL', logo: 'cib:mysql' },
    { text: 'MongoDB', logo: 'cib:mongodb' },
  ],
  'Lao Quan': [
    { text: 'Discord', logo: 'mdi:discord' },
    { text: 'Spotify', logo: 'mdi:spotify' },
    { text: 'Visual Studio', logo: 'mdi:visual-studio' },
    { text: 'Brave', logo: 'cib:brave' },
  ],
}
