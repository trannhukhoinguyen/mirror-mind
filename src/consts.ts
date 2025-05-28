import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: 'Tổ Sư Thiền',
  description: "",
  href: 'https://tosuthien.top',
  author: 'Patriarchal Zen',
  locale: 'en-US',
  location: 'Vietnam',
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
    href: 'https://www.youtube.com/@PhapMonToSuThien',
    label: 'Youtube',
  },
  {
    href: 'https://www.youtube.com/@thientosu9432',
    label: 'Youtube',
  },
  {
    href: 'https://www.youtube.com/c/T%C3%B4ngPhongT%E1%BB%95S%C6%B0Thi%E1%BB%81n',
    label: 'Youtube',
  },
  {
    href: 'https://www.youtube.com/@H%C3%B9ngV%C5%A9V%C4%83nOfficial',
    label: 'Youtube',
  },
  {
    href: 'https://www.facebook.com/Nhohoivanhin',
    label: 'Facebook',
  },
]

export const ICON_MAP: IconMap = {
  Youtube: 'lucide:youtube',
  Facebook: 'lucide:facebook',
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

export type Minds = {
  'Sắc Ấm': Category[]
  'Thọ Ấm': Category[]
  'Tưởng Ấm': Category[]
  'Hành Ấm': Category[]
  'Thức Ấm': Category[]
}

export const minds: Minds = {
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
    ],
  'Hành Ấm': [
    { text: 'Phá Vọng Động Chấp', logo: 'mdi:windows' },
  ],
  'Thức Ấm': [
    { text: 'Phá Phân Biệt Chấp', logo: 'mdi:language-lua' },
  ],
}
