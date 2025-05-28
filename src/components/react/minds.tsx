import { useEffect } from 'react'
import { minds, type MindTypes, type Category } from '../../consts'
import { InfiniteScroll } from '../ui/infinite-scroll'
import { type IconType } from 'react-icons'
import { FaQuestionCircle } from 'react-icons/fa'
import { FileCode, LucideAppWindow, Code } from 'lucide-react'

const categories = Object.keys(minds)
const groupSize = Math.ceil(categories.length / 5)
const categoryGroups = [
  categories.slice(0, groupSize),
  categories.slice(groupSize, groupSize * 2),
  categories.slice(groupSize * 2, groupSize * 3),
  categories.slice(groupSize * 3, groupSize * 4),
  categories.slice(groupSize * 4),
]

const Minds: React.FC = () => {
  useEffect(() => {
    document.querySelectorAll('.tech-badge').forEach((badge) => {
      badge.classList.add('tech-badge-visible')
    })
  }, [])

  return (
    <div className="z-30 mt-12 flex w-full flex-col max-w-[calc(100vw-5rem)] mx-auto lg:max-w-full">
      <div className="space-y-2">
        {categoryGroups.map((group, groupIndex) => (
          <InfiniteScroll
            key={groupIndex}
            duration={50000}
            direction={groupIndex % 2 === 0 ? 'normal' : 'reverse'}
            showFade={true}
            className="flex flex-row justify-center"
          >
            {group.flatMap((category) =>
              minds[category as keyof MindTypes].map(
                (mind: Category, mindIndex: number) => {
                  const IconComponent = FaQuestionCircle
                  return (
                    <div
                      key={`${category}-${mindIndex}`}
                      className="tech-badge repo-card border-border bg-card text-muted-foreground mr-5 flex items-center gap-3 rounded-full border p-3 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md"
                      data-tech-name={`${category}-${mindIndex}`}
                    >
                      <span className="bg-muted flex h-10 w-10 items-center justify-center rounded-full p-2 text-lg shadow-inner">
                        <IconComponent className="tech-icon text-primary" />
                      </span>
                      <span className="text-foreground font-medium">
                        {mind.text}
                      </span>
                    </div>
                  )
                },
              ),
            )}
          </InfiniteScroll>
        ))}
      </div>
    </div>
  )
}

export default Minds
