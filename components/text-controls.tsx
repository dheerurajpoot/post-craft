"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, AlignLeft, AlignCenter, AlignRight } from "lucide-react"
import type { CanvasElement } from "@/types"

interface TextControlsProps {
  element?: CanvasElement
  onUpdate: (updates: Partial<CanvasElement>) => void
  onClose: () => void
}

const FONT_FAMILIES = [
  { value: "Inter", label: "Inter" },
  { value: "Arial", label: "Arial" },
  { value: "Georgia", label: "Georgia" },
  { value: "Times New Roman", label: "Times New Roman" },
  { value: "Courier New", label: "Courier New" },
  { value: "Verdana", label: "Verdana" },
  { value: "Comic Sans MS", label: "Comic Sans" },
  { value: "Impact", label: "Impact" },
  { value: "Trebuchet MS", label: "Trebuchet" },
]

export function TextControls({ element, onUpdate, onClose }: TextControlsProps) {
  if (!element || element.type !== "text") return null

  return (
    <div className="fixed inset-x-4 bottom-20 bg-card border border-border rounded-xl p-4 shadow-2xl z-50 max-h-[70vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-card-foreground">Text Settings</h3>
        <Button onClick={onClose} size="icon" variant="ghost">
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-3">
        <div>
          <Label className="text-xs text-muted-foreground">Content</Label>
          <Input value={element.content} onChange={(e) => onUpdate({ content: e.target.value })} className="mt-1" />
        </div>

        <div>
          <Label className="text-xs text-muted-foreground">Font Style</Label>
          <Select value={element.fontFamily || "Inter"} onValueChange={(value) => onUpdate({ fontFamily: value })}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FONT_FAMILIES.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  <span style={{ fontFamily: font.value }}>{font.label}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs text-muted-foreground">Font Size</Label>
            <Input
              type="number"
              value={element.fontSize}
              onChange={(e) => onUpdate({ fontSize: Number.parseInt(e.target.value) })}
              className="mt-1"
              min="10"
              max="200"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Color</Label>
            <Input
              type="color"
              value={element.color}
              onChange={(e) => onUpdate({ color: e.target.value })}
              className="mt-1 h-10"
            />
          </div>
        </div>

        <div>
          <Label className="text-xs text-muted-foreground mb-2 block">Alignment</Label>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={element.textAlign === "left" ? "default" : "outline"}
              onClick={() => onUpdate({ textAlign: "left" })}
              className="flex-1"
            >
              <AlignLeft className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={element.textAlign === "center" ? "default" : "outline"}
              onClick={() => onUpdate({ textAlign: "center" })}
              className="flex-1"
            >
              <AlignCenter className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={element.textAlign === "right" ? "default" : "outline"}
              onClick={() => onUpdate({ textAlign: "right" })}
              className="flex-1"
            >
              <AlignRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div>
          <Label className="text-xs text-muted-foreground mb-2 block">Font Weight</Label>
          <div className="grid grid-cols-3 gap-2">
            <Button
              size="sm"
              variant={element.fontWeight === "normal" ? "default" : "outline"}
              onClick={() => onUpdate({ fontWeight: "normal" })}
            >
              Normal
            </Button>
            <Button
              size="sm"
              variant={element.fontWeight === "bold" ? "default" : "outline"}
              onClick={() => onUpdate({ fontWeight: "bold" })}
            >
              Bold
            </Button>
            <Button
              size="sm"
              variant={element.fontWeight === "lighter" ? "default" : "outline"}
              onClick={() => onUpdate({ fontWeight: "lighter" })}
            >
              Light
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
