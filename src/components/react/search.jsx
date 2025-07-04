import Fuse from 'fuse.js'
import { useState, useMemo, useCallback } from 'react'
import { Input } from '@/components/ui/input'
import ExerciseCardJSX from './exercise-card'
import DoubtCardJSX from './doubt-card'
import KoanCardJSX from './koan-card'
import debounce from 'lodash.debounce'
import { cn } from '@/lib/utils'

const options = {
  keys: ['data.title', 'data.description', 'data.tags'],
  includeMatches: true,
  minMatchCharLength: 3,
  threshold: 0.3,
  distance: 100,
  sortFn: (a, b) => a.score - b.score,
}

function Search({ searchList, initialPosts }) {
  const [query, setQuery] = useState('')
  const [filteredPosts, setFilteredPosts] = useState(initialPosts)

  const processedSearchList = useMemo(
    () =>
      searchList.map((item) => ({
        ...item,
        data: {
          ...item.data,
          title: item.data.title.toLowerCase(),
          description: item.data.description.toLowerCase(),
          tags: item.data.tags.map((tag) => tag.toLowerCase()),
        },
      })),
    [searchList],
  )

  const fuse = useMemo(
    () => new Fuse(processedSearchList, options),
    [processedSearchList],
  )

  const handleOnSearch = useCallback(
    debounce((searchQuery) => {
      if (searchQuery.length > 2) {
        const results = fuse
          .search(searchQuery.toLowerCase())
          .map((result) => result.item)
        setFilteredPosts(results)
      } else {
        setFilteredPosts(initialPosts)
      }
    }, 100),
    [fuse, initialPosts],
  )

  const handleInputChange = (event) => {
    const searchQuery = event.target.value
    setQuery(searchQuery)
    handleOnSearch(searchQuery)
  }

  return (
    <div>
      <div>
        <label
          htmlFor="search"
          className="text-foreground mb-2 block text-sm font-medium dark:text-white"
        >
          Search
        </label>
        <Input
          type="text"
          value={query}
          onChange={handleInputChange}
          name="search"
          id="search"
          autoComplete="off"
          autoCorrect="off"
          placeholder="Bạn tìm gì?"
          className="w-full outline-none focus:ring-0 dark:bg-neutral-900 dark:text-white"
        />
      </div>

      <hr className="my-6 border-neutral-200 dark:border-neutral-700" />
      <div className={cn('flex items-center justify-between', 'mb-4', !query && 'hidden')}>
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
          {filteredPosts.length} posts found
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Search results for: <strong>{query}</strong>
        </p>
      </div>

      <div className="mt-6">
        <ul className="flex flex-col gap-4">
          {filteredPosts.slice(0, 50).map((post, index) => (
            post.data.tags?.includes('nghi ngờ')
              ? <li key={post.id || post.slug || index}>
                  <DoubtCardJSX entry={post} />
                </li>
              : post.data.tags?.includes('giai thoại')
                ? <li key={post.id || post.slug || index}>
                    <AnecdoteCardJSX entry={post} />
                  </li>
                : <li key={post.id || post.slug || index}>
                    <ExerciseCardJSX entry={post} />
                  </li>
          ))}
        </ul>

        {filteredPosts.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-neutral-600 dark:text-neutral-400">
              Chưa có bài thỏa điều kiện tìm kiếm
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Search
