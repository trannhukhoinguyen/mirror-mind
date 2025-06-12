import { SITE } from '@/consts'
import type { APIContext } from 'astro'
import { getAllExercise, getAllDoubt,  getAllAnecdote, getAllDoctrine, getAllTags } from '@/lib/data-utils'

export async function GET(context: APIContext) {
  try {
    const exercises = await getAllExercise()
    const doubts = await getAllDoubt()
    const anecdotes = await getAllAnecdote()
    const doctrines = await getAllDoctrine()
    const tags = await getAllTags()
    const site = context.site ?? SITE.href
    const baseUrl = site.toString().endsWith('/') ? site.toString().slice(0, -1) : site.toString()

    const staticPages = [
      {
        url: `${baseUrl}/`,
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: '1.0'
      },
      {
        url: `${baseUrl}/doctrines`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: '0.8'
      },
      {
        url: `${baseUrl}/exercises`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: '0.8'
      },
      {
        url: `${baseUrl}/doubts`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: '0.8'
      },
      {
        url: `${baseUrl}/anecdotes`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: '0.8'
      },
      {
        url: `${baseUrl}/doubts`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: '0.8'
      },
      {
        url: `${baseUrl}/anecdotes`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: '0.8'
      }
    ]

    const exercisePosts = exercises.map(post => ({
      url: `${baseUrl}/exercises/${post.id}/`,
      lastmod: post.data.date.toISOString(),
      changefreq: 'monthly',
      priority: '0.6'
    }))

    const doubtPosts = doubts.map(post => ({
      url: `${baseUrl}/doubts/${post.id}/`,
      lastmod: post.data.date.toISOString(),
      changefreq: 'monthly',
      priority: '0.6'
    }))

    const anecdotePosts = anecdotes.map(post => ({
      url: `${baseUrl}/anecdotes/${post.id}/`,
      lastmod: post.data.date.toISOString(),
      changefreq: 'monthly',
      priority: '0.6'
    }))

    const doctrinePosts = doctrines.map(post => ({
      url: `${baseUrl}/doctrines/${post.id}/`,
      lastmod: (post.data.endDate ?? new Date()).toISOString(),
      changefreq: 'monthly',
      priority: '0.6'
    }))

    const tagUrls = Array.from(tags, ([tag]) => ({
      url: `${baseUrl}/tags/${tag}/`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.5'
    }))

    const allUrls = [...staticPages, ...doctrinePosts, ...exercisePosts, ...doubtPosts, ...anecdotePosts, ...tagUrls]

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allUrls
  .map(
    page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600'
      }
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return new Response('Error generating sitemap', { status: 500 })
  }
}
