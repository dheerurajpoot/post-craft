"use client"

import { X, Info, Mail, Shield, FileText, ScrollText, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const menuItems = [
    { icon: Info, label: "About Us", href: "/about" },
    { icon: Mail, label: "Contact Us", href: "/contact" },
    { icon: Shield, label: "Privacy Policy", href: "/privacy" },
    { icon: FileText, label: "Terms of Service", href: "/terms" },
    { icon: ScrollText, label: "Disclaimer", href: "/disclaimer" },
    { icon: MessageSquare, label: "Feedback", href: "/feedback" },
  ]

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" onClick={onClose} />}

      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-card border-r border-border z-50 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">Menu</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href} onClick={onClose}>
                <Button variant="ghost" className="w-full justify-start" size="lg">
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Button>
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-xs text-muted-foreground text-center">
            <p className="font-semibold">PostCraft</p>
            <p>Version 1.0.0</p>
          </div>
        </div>
      </aside>
    </>
  )
}
