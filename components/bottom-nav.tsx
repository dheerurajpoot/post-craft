"use client"

import { Layers, ImageIcon, Sparkles, FolderOpen } from "lucide-react"

interface BottomNavProps {
  activeTab: "editor" | "templates" | "backgrounds" | "designs"
  onTabChange: (tab: "editor" | "templates" | "backgrounds" | "designs") => void
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const navItems = [
    { id: "editor" as const, icon: Layers, label: "Editor" },
    { id: "templates" as const, icon: Sparkles, label: "Templates" },
    { id: "backgrounds" as const, icon: ImageIcon, label: "Backgrounds" },
    { id: "designs" as const, icon: FolderOpen, label: "My Designs" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
