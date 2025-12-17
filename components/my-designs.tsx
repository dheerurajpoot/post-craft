"use client"
import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface SavedDesign {
  id: string
  thumbnail: string
  timestamp: number
  aspectRatio: string
}

interface MyDesignsProps {
  onLoadDesign: (design: any) => void
}

export function MyDesigns({ onLoadDesign }: MyDesignsProps) {
  const [designs, setDesigns] = useState<SavedDesign[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("savedDesigns")
    if (saved) {
      setDesigns(JSON.parse(saved))
    }
  }, [])

  const loadDesign = (design: SavedDesign) => {
    const saved = localStorage.getItem("savedDesigns")
    if (saved) {
      const allDesigns = JSON.parse(saved)
      const fullDesign = allDesigns.find((d: SavedDesign) => d.id === design.id)
      if (fullDesign) {
        onLoadDesign(fullDesign)
      }
    }
  }

  const deleteDesign = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const updated = designs.filter((d) => d.id !== id)
    setDesigns(updated)
    localStorage.setItem("savedDesigns", JSON.stringify(updated))
  }

  return (
    <div className="p-4 space-y-4">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">My Designs</h2>
        <p className="text-sm text-muted-foreground">Your saved posts ({designs.length})</p>
      </div>

      {designs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-muted-foreground mb-2">No saved designs yet</p>
          <p className="text-sm text-muted-foreground">Create and download a post to save it here</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {designs.map((design) => (
            <Card
              key={design.id}
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow relative group"
              onClick={() => loadDesign(design)}
            >
              <img
                src={design.thumbnail || "/placeholder.svg"}
                alt="Design"
                className="w-full aspect-square object-cover"
              />
              <div className="p-3 bg-card">
                <p className="text-xs text-muted-foreground">{new Date(design.timestamp).toLocaleDateString()}</p>
                <p className="text-xs font-medium text-card-foreground">{design.aspectRatio}</p>
              </div>
              <Button
                size="icon"
                variant="destructive"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => deleteDesign(design.id, e)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
