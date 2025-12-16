"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Loader2 } from "lucide-react"

interface PexelsPhoto {
  id: number
  src: {
    large: string
    medium: string
    small: string
  }
  photographer: string
}

export function Images() {
  const [query, setQuery] = useState("motivation")
  const [photos, setPhotos] = useState<PexelsPhoto[]>([])
  const [loading, setLoading] = useState(false)

  const searchImages = async (searchQuery: string) => {
    setLoading(true)
    try {
      const response = await fetch(`https://api.pexels.com/v1/search?query=${searchQuery}&per_page=20`, {
        headers: {
          Authorization: "gFbMuit66LBWnVXYeAJC6MfG0JH98YPgGGNQOWHGmWzLJA9IgfJPh01r",
        },
      })
      const data = await response.json()
      setPhotos(data.photos || [])
    } catch (error) {
      console.error("Error fetching images:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    searchImages("motivation")
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      searchImages(query)
    }
  }

  const addImageToCanvas = (imageUrl: string) => {
    const currentDesign = JSON.parse(localStorage.getItem("currentDesign") || "{}")
    const newElement = {
      id: Date.now().toString(),
      type: "image",
      src: imageUrl,
      x: 50,
      y: 50,
      width: 400,
      height: 400,
    }

    currentDesign.elements = [...(currentDesign.elements || []), newElement]
    localStorage.setItem("currentDesign", JSON.stringify(currentDesign))

    alert("Image added to canvas! Switch to Editor tab to see it.")
  }

  return (
    <div className="p-4 space-y-4">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">Stock Images</h2>
        <p className="text-sm text-muted-foreground">Search and add images from Pexels</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search images..."
          className="flex-1"
        />
        <Button type="submit" size="icon" disabled={loading}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
        </Button>
      </form>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {photos.map((photo) => (
          <Card
            key={photo.id}
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => addImageToCanvas(photo.src.large)}
          >
            <img
              src={photo.src.medium || "/placeholder.svg"}
              alt={photo.photographer}
              className="w-full aspect-square object-cover"
            />
            <div className="p-2 bg-card">
              <p className="text-xs text-muted-foreground truncate">By {photo.photographer}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
