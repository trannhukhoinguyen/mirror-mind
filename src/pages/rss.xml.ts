import { SITE } from '@/consts'
import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getAllExercise, getAllDoubt, getAllAnecdote } from '@/lib/data-utils'

export async function GET(context: APIContext) {
  try {
    const exercises = await getAllExercise()
    const doubts = await getAllDoubt()
    const anecdotes = await getAllAnecdote()
    const posts = [
      ...exercises,
      ...doubts,
      ...anecdotes,
    ]

    return rss({
      title: SITE.title,
      description: SITE.description,
      site: context.site ?? SITE.href,
      items: posts.map((post) => {
        const type = post.data.tags?.includes('nghi ngờ')
            ? 'doubt'
            : post.data.tags?.includes('giai thoại')
              ? 'anecdote'
              : 'exercise'

        return {
          title: post.data.title,
          description: post.data.description,
          pubDate: post.data.date,
          link: `/${type}/${post.id}/`,
        }
      }),
    })
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    return new Response('Error generating RSS feed', { status: 500 })
  }
}
