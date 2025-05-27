'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { cn } from '@/lib/utils'

interface InfiniteScrollProps {
  className?: string
  duration?: number
  direction?: 'normal' | 'reverse'
  containerColor?: string
  showFade?: boolean
  children: React.ReactNode
  pauseOnHover?: boolean
}

export function InfiniteScroll({
  className,
  duration = 15000,
  direction = 'normal',
  containerColor = '#ffffff',
  showFade = true,
  children,
  pauseOnHover = true,
}: InfiniteScrollProps) {
  const [contentWidth, setContentWidth] = useState<number>(0)
  const [isPaused, setIsPaused] = useState(false)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const controls = useAnimationControls()
  const elapsedTimeRef = useRef(0)
  const lastTimeRef = useRef(0)

  useEffect(() => {
    const content = contentRef.current
    if (!content) return

    const updateWidth = () => {
      const width = content.offsetWidth
      setContentWidth(width)
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [children])

  useEffect(() => {
    if (!contentWidth) return

    const startX = direction === 'normal' ? 0 : -contentWidth
    const endX = direction === 'normal' ? -contentWidth : 0

    if (!isPaused) {
      const remainingDuration = duration - elapsedTimeRef.current
      const progress = elapsedTimeRef.current / duration
      const currentX =
        direction === 'normal'
          ? startX + (endX - startX) * progress
          : endX + (startX - endX) * (1 - progress)

      controls.set({ x: currentX })
      controls.start({
        x: endX,
        transition: {
          duration: remainingDuration / 1000,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
          repeatDelay: 0,
        },
      })

      lastTimeRef.current = Date.now()
    }
  }, [controls, direction, duration, contentWidth, isPaused])

  const handleMouseEnter = () => {
    if (!pauseOnHover) return

    const currentTime = Date.now()
    const deltaTime = currentTime - lastTimeRef.current
    elapsedTimeRef.current = (elapsedTimeRef.current + deltaTime) % duration

    setIsPaused(true)
    controls.stop()
  }

  const handleMouseLeave = () => {
    if (!pauseOnHover) return
    lastTimeRef.current = Date.now()
    setIsPaused(false)
  }

  return (
    <div
      className={cn(
        'relative flex shrink-0 flex-col gap-4 overflow-hidden py-3 sm:py-2 sm:gap-2',
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex">
        <motion.div
          ref={scrollerRef}
          className="flex shrink-0"
          animate={controls}
        >
          <div ref={contentRef} className="flex shrink-0">
            {children}
          </div>
          <div className="flex shrink-0">{children}</div>
          <div className="flex shrink-0">{children}</div>
        </motion.div>
      </div>
      {showFade && (
        <div
          className="from-background to-background pointer-events-none absolute inset-0 bg-linear-to-r via-transparent sm:bg-gradient-to-r"
          style={{ '--container-color': containerColor } as React.CSSProperties}
        />
      )}
    </div>
  )
}