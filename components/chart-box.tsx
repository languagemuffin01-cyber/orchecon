"use client"

import { cloneElement, useEffect, useRef, useState, type ReactElement } from "react"

/**
 * Measures its own size with a ResizeObserver and renders the recharts chart
 * with explicit numeric width/height. This avoids recharts' ResponsiveContainer,
 * which logs "width(-1) and height(-1)" warnings when it tries to measure during
 * SSR and the first client paint before its own observer has fired.
 */
export function ChartBox({
  children,
  className,
}: {
  children: ReactElement<{ width?: number; height?: number }>
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        setSize({ width: Math.round(width), height: Math.round(height) })
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={className}>
      {size.width > 0 && size.height > 0
        ? cloneElement(children, { width: size.width, height: size.height })
        : null}
    </div>
  )
}
