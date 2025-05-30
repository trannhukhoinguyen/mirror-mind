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
    href: '/theory',
    label: 'theory',
  },
  {
    href: '/practice',
    label: 'practice',
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
  logo?: string
}

export type MindTypes = {
  'Hưu Khứ': Category[]
  'Hiết Khứ': Category[]
  'Lãnh Khứ': Category[]
  'Nhất Niệm Vạn Niên': Category[]
  'Hàn Khôi Khô Mộc': Category[]
  'Cổ Miếu Hương Lư': Category[]
  'Lụa Trắng': Category[]
}

export const minds: MindTypes = {
  'Hưu Khứ': [
    { text: 'Đơn giản hóa cuộc sống, bớt nói, bớt giao tiếp, bỏ mạng xã hội' },
  ],
  'Hiết Khứ': [
    { text: 'Không đọc thêm kinh luận trong lúc tham thoại đầu, không lý giải' },
  ],
  'Lãnh Khứ': [
    { text: 'Nhận ra khi nghi tình ổn định, tâm như dòng nước lạnh, không bị cuốn' },
    ],
  'Nhất Niệm Vạn Niên': [
    { text: 'Giữ nghi tình như hơi thở nhẹ nhàng, không đoạn' },
  ],
  'Hàn Khôi Khô Mộc': [
    { text: 'Không còn tâm phản ứng, quan sát thấy vọng nhưng không bị lôi' },
  ],
  'Cổ Miếu Hương Lư': [
    { text: 'Không cầu chứng, không mong thấy gì, buông cả “ngộ”' },
  ],
  'Lụa Trắng': [
    { text: 'Nếu tâm thuần tịnh, không biết mình đang tu, ấy là gần cửa' },
  ],
}
