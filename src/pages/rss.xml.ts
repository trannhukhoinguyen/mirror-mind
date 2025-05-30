import { SITE } from '@/consts'
import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getAllPractice } from '@/lib/data-utils'

export async function GET(context: APIContext) {
  try {
    const practices = await getAllPractice()

    return rss({
      title: SITE.title,
      description: SITE.description,
      site: context.site ?? SITE.href,
      items: practices.map((practice) => ({
        title: practice.data.title,
        description: practice.data.description,
        pubDate: practice.data.date,
        link: `/practice/${practice.id}/`,
      })),
    })
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    return new Response('Error generating RSS feed', { status: 500 })
  }
}
