"use client"

import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
  onClose: () => void
}

const presetColors = [
  "#ffffff",
  "#000000",
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEAA7",
  "#DFE6E9",
  "#6C5CE7",
  "#FD79A8",
  "#FDCB6E",
  "#00B894",
]

export function ColorPicker({ color, onChange, onClose }: ColorPickerProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-card-foreground">Background Color</h4>
        <Button onClick={onClose} size="icon" variant="ghost">
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-6 gap-2">
        {presetColors.map((presetColor) => (
          <button
            key={presetColor}
            onClick={() => onChange(presetColor)}
            className="w-10 h-10 rounded-lg border-2 transition-transform hover:scale-110"
            style={{
              backgroundColor: presetColor,
              borderColor: color === presetColor ? "hsl(var(--primary))" : "hsl(var(--border))",
            }}
          />
        ))}
      </div>

      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-12 rounded-lg cursor-pointer"
      />
    </div>
  )
}
