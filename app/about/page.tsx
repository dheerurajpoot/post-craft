"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 flex items-center gap-4 px-4 py-3 border-b border-border bg-card">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-bold text-foreground">About Us</h1>
      </header>

      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Welcome to PostCraft</h2>
          <p className="text-muted-foreground leading-relaxed">
            PostCraft is a powerful social media post creator designed to help you create stunning visual content for
            your social media platforms. Whether you're a content creator, marketer, or business owner, our intuitive
            tools make it easy to design professional-looking posts in minutes.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Our Mission</h3>
          <p className="text-muted-foreground leading-relaxed">
            We believe that everyone should have access to professional design tools without the complexity of
            traditional design software. PostCraft empowers users to create eye-catching social media content with ease,
            helping them grow their online presence and engage their audience effectively.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Features</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Multiple aspect ratios for different social platforms</li>
            <li>Pre-designed templates for quick creation</li>
            <li>Drag-and-drop text and image placement</li>
            <li>Access to thousands of stock images via Pexels</li>
            <li>Custom fonts and styling options</li>
            <li>Auto-save functionality to never lose your work</li>
            <li>Download your designs in high quality</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Why Choose PostCraft?</h3>
          <p className="text-muted-foreground leading-relaxed">
            PostCraft combines simplicity with powerful features, giving you everything you need to create professional
            social media posts. Our mobile-first design ensures you can create content anywhere, anytime. Plus, all your
            designs are saved locally, giving you complete control over your content.
          </p>
        </div>
      </div>
    </main>
  )
}
