"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import type { CanvasElement, AspectRatio } from "@/types"

interface CanvasProps {
  elements: CanvasElement[]
  aspectRatio: AspectRatio
  backgroundColor: string
  selectedElement: string | null
  onSelectElement: (id: string | null) => void
  onUpdateElements: (elements: CanvasElement[]) => void
}

const ASPECT_RATIOS = {
  "1:1": { width: 1080, height: 1080 },
  "4:5": { width: 1080, height: 1350 },
  "9:16": { width: 1080, height: 1920 },
  "16:9": { width: 1920, height: 1080 },
}

export function Canvas({
  elements,
  aspectRatio,
  backgroundColor,
  selectedElement,
  onSelectElement,
  onUpdateElements,
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const dimensions = ASPECT_RATIOS[aspectRatio]
    canvas.width = dimensions.width
    canvas.height = dimensions.height

    // Calculate scale for display
    const containerWidth = container.clientWidth
    const newScale = containerWidth / dimensions.width
    setScale(newScale)
  }, [aspectRatio])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const dimensions = ASPECT_RATIOS[aspectRatio]

    // Clear canvas
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Render elements
    elements.forEach((element) => {
      if (element.type === "text") {
        ctx.fillStyle = element.color || "#000000"
        ctx.font = `${element.fontWeight || "normal"} ${element.fontSize}px ${element.fontFamily || "Inter"}`
        ctx.textAlign = (element.textAlign as CanvasTextAlign) || "left"
        ctx.textBaseline = "top"
        ctx.fillText(element.content || "", element.x, element.y)

        // Draw selection border
        if (element.id === selectedElement) {
          const metrics = ctx.measureText(element.content || "")
          const textHeight = element.fontSize || 32
          ctx.strokeStyle = "#8B5CF6"
          ctx.lineWidth = 3
          ctx.strokeRect(element.x - 5, element.y - 5, metrics.width + 10, textHeight + 10)
        }
      } else if (element.type === "image" && element.src) {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.onload = () => {
          ctx.drawImage(img, element.x, element.y, element.width || 200, element.height || 200)

          // Draw selection border
          if (element.id === selectedElement) {
            ctx.strokeStyle = "#8B5CF6"
            ctx.lineWidth = 3
            ctx.strokeRect(element.x - 5, element.y - 5, (element.width || 200) + 10, (element.height || 200) + 10)
          }
        }
        img.src = element.src
      }
    })
  }, [elements, aspectRatio, backgroundColor, selectedElement])

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left) / scale
    const y = (e.clientY - rect.top) / scale
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Check if clicking on an element (reverse order to get topmost)
    for (let i = elements.length - 1; i >= 0; i--) {
      const element = elements[i]

      if (element.type === "text") {
        ctx.font = `${element.fontWeight || "normal"} ${element.fontSize}px ${element.fontFamily || "Inter"}`
        const metrics = ctx.measureText(element.content || "")
        const textHeight = element.fontSize || 32

        if (x >= element.x && x <= element.x + metrics.width && y >= element.y && y <= element.y + textHeight) {
          setDragging(element.id)
          setDragOffset({ x: x - element.x, y: y - element.y })
          onSelectElement(element.id)
          return
        }
      } else if (element.type === "image") {
        if (
          x >= element.x &&
          x <= element.x + (element.width || 200) &&
          y >= element.y &&
          y <= element.y + (element.height || 200)
        ) {
          setDragging(element.id)
          setDragOffset({ x: x - element.x, y: y - element.y })
          onSelectElement(element.id)
          return
        }
      }
    }

    onSelectElement(null)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragging) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left) / scale
    const y = (e.clientY - rect.top) / scale

    const updatedElements = elements.map((el) =>
      el.id === dragging ? { ...el, x: Math.max(0, x - dragOffset.x), y: Math.max(0, y - dragOffset.y) } : el,
    )
    onUpdateElements(updatedElements)
  }

  const handleMouseUp = () => {
    setDragging(null)
  }

  return (
    <div ref={containerRef} className="relative bg-muted rounded-xl p-4 overflow-hidden">
      <canvas
        id="postCanvas"
        ref={canvasRef}
        className="w-full h-auto max-h-[60vh] object-contain rounded-lg shadow-lg cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  )
}
