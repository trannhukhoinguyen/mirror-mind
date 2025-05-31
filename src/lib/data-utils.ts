import { getCollection, type CollectionEntry } from 'astro:content'

export async function getAllPractice(): Promise<CollectionEntry<'practice'>[]> {
  const posts = await getCollection('practice')
  return posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
}

export async function getRecentPractice(
  count: number,
): Promise<CollectionEntry<'practice'>[]> {
  const posts = await getAllPractice()
  return posts.slice(0, count)
}

export async function getAdjacentPractice(currentId: string): Promise<{
  prev: CollectionEntry<'practice'> | null
  next: CollectionEntry<'practice'> | null
}> {
  const posts = await getAllPractice()
  const currentIndex = posts.findIndex((post) => post.id === currentId)

  if (currentIndex === -1) {
    return { prev: null, next: null }
  }

  return {
    next: currentIndex > 0 ? posts[currentIndex - 1] : null,
    prev: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
  }
}

export async function getAllTags(): Promise<Map<string, number>> {
  const posts = await getAllPractice()

  return posts.reduce((acc, post) => {
    post.data.tags?.forEach((tag: string) => {
      acc.set(tag, (acc.get(tag) || 0) + 1)
    })
    return acc
  }, new Map<string, number>())
}

export async function getSortedTags(): Promise<
  { tag: string; count: number }[]
> {
  const tagCounts = await getAllTags()

  return [...tagCounts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => {
      const countDiff = b.count - a.count
      return countDiff !== 0 ? countDiff : a.tag.localeCompare(b.tag)
    })
}

export function groupPracticeByYear(
  posts: CollectionEntry<'practice'>[],
): Record<string, CollectionEntry<'practice'>[]> {
  return posts.reduce(
    (acc: Record<string, CollectionEntry<'practice'>[]>, post) => {
      const year = post.data.date.getFullYear().toString()
      ;(acc[year] ??= []).push(post)
      return acc
    },
    {},
  )
}

export async function getPracticeByAuthor(
  authorId: string,
): Promise<CollectionEntry<'practice'>[]> {
  const posts = await getAllPractice()
  return posts.filter((post) => post.data.authors?.includes(authorId))
}

export async function getPracticeByTag(
  tag: string,
): Promise<CollectionEntry<'practice'>[]> {
  const posts = await getAllPractice()
  return posts.filter((post) => post.data.tags?.includes(tag))
}

export async function getAllDoctrines(): Promise<CollectionEntry<'doctrines'>[]> {
  const doctrines = await getCollection('doctrines')
  return doctrines
    .sort((a, b) => (b.data.startDate?.valueOf() ?? 0) - (a.data.startDate?.valueOf() ?? 0))
}

export async function getTheoryFeaturedTags(maxCount: number): Promise<string[]> {
  const doctrines = await getAllDoctrines()
  const tags = new Set<string>()

  for (const doctrine of doctrines) {
    if (doctrine.data.tags) {
      for (const tag of doctrine.data.tags) {
        tags.add(tag)
      }
    }
    if (tags.size >= maxCount) {
      break
    }
  }

  return Array.from(tags).slice(0, maxCount)
}
