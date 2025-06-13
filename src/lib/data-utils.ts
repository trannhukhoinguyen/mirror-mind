import { getCollection, type CollectionEntry } from 'astro:content'

// Type Blog: Exercise
export async function getAllExercise(): Promise<CollectionEntry<'exercises'>[]> {
  const posts = await getCollection('exercises')
  return posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
}

export async function getRecentExercise(
  count: number,
): Promise<CollectionEntry<'exercises'>[]> {
  const posts = await getAllExercise()
  return posts.slice(0, count)
}

export async function getAdjacentExercise(currentId: string): Promise<{
  prev: CollectionEntry<'exercises'> | null
  next: CollectionEntry<'exercises'> | null
}> {
  const posts = await getAllExercise()
  const currentIndex = posts.findIndex((post) => post.id === currentId)

  if (currentIndex === -1) {
    return { prev: null, next: null }
  }

  return {
    next: currentIndex > 0 ? posts[currentIndex - 1] : null,
    prev: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
  }
}

export function groupExerciseByYear(
  posts: CollectionEntry<'exercises'>[],
): Record<string, CollectionEntry<'exercises'>[]> {
  return posts.reduce(
    (acc: Record<string, CollectionEntry<'exercises'>[]>, post) => {
      const year = post.data.date.getFullYear().toString()
      ;(acc[year] ??= []).push(post)
      return acc
    },
    {},
  )
}

export async function getExerciseByAuthor(
  authorId: string,
): Promise<CollectionEntry<'exercises'>[]> {
  const posts = await getAllExercise()
  return posts.filter((post) => post.data.authors?.includes(authorId))
}

export async function getExercisesByTag(
  tag: string,
): Promise<CollectionEntry<'exercises'>[]> {
  const posts = await getAllExercise()
  return posts.filter((post) => post.data.tags?.includes(tag))
}

// Type Blog: Doubt
export async function getAllDoubt(): Promise<CollectionEntry<'doubts'>[]> {
  const posts = await getCollection('doubts')
  return posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
}

export async function getAdjacentDoubt(currentId: string): Promise<{
  prev: CollectionEntry<'doubts'> | null
  next: CollectionEntry<'doubts'> | null
}> {
  const posts = await getAllDoubt()
  const currentIndex = posts.findIndex((post) => post.id === currentId)

  if (currentIndex === -1) {
    return { prev: null, next: null }
  }

  return {
    next: currentIndex > 0 ? posts[currentIndex - 1] : null,
    prev: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
  }
}

export async function getDoubtsByTag(
  tag: string,
): Promise<CollectionEntry<'doubts'>[]> {
  const posts = await getAllDoubt()
  return posts.filter((post) => post.data.tags?.includes(tag))
}

// Type Blog: Koan
export async function getAllKoan(): Promise<CollectionEntry<'koans'>[]> {
  const posts = await getCollection('koans')
  return posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
}

export async function getAdjacentKoan(currentId: string): Promise<{
  prev: CollectionEntry<'koans'> | null
  next: CollectionEntry<'koans'> | null
}> {
  const posts = await getAllKoan()
  const currentIndex = posts.findIndex((post) => post.id === currentId)

  if (currentIndex === -1) {
    return { prev: null, next: null }
  }

  return {
    next: currentIndex > 0 ? posts[currentIndex - 1] : null,
    prev: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
  }
}

export async function getKoansByTag(
  tag: string,
): Promise<CollectionEntry<'koans'>[]> {
  const posts = await getAllKoan()
  return posts.filter((post) => post.data.tags?.includes(tag))
}

// Type Project: Doctrine...
export async function getAllDoctrine(): Promise<CollectionEntry<'projects'>[]> {
  const doctrines = await getCollection('projects')
  return doctrines
    .sort((a, b) => (b.data.startDate?.valueOf() ?? 0) - (a.data.startDate?.valueOf() ?? 0))
}

export async function getDoctrineFeaturedTags(maxCount: number): Promise<string[]> {
  const doctrines = await getAllDoctrine()
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


// All Tags
export async function getAllTags(): Promise<Map<string, number>> {
  const exercises = await getAllExercise()
  const doubts = await getAllDoubt()
  const koans = await getAllKoan()
  const posts = [
    ...exercises,
    ...doubts,
    ...koans,
  ]

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
