"use client"

import type React from "react"

import { ArrowLeft, Send, ThumbsUp, ThumbsDown, Lightbulb, Bug } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { useState } from "react"

export default function FeedbackPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const feedbackTypes = [
    { id: "positive", icon: ThumbsUp, label: "Positive", color: "text-green-500" },
    { id: "negative", icon: ThumbsDown, label: "Negative", color: "text-red-500" },
    { id: "feature", icon: Lightbulb, label: "Feature Request", color: "text-yellow-500" },
    { id: "bug", icon: Bug, label: "Bug Report", color: "text-orange-500" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setSelectedType(null)
    }, 3000)
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 flex items-center gap-4 px-4 py-3 border-b border-border bg-card">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-bold text-foreground">Feedback</h1>
      </header>

      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">We Value Your Feedback</h2>
          <p className="text-muted-foreground leading-relaxed">
            Help us improve PostCraft by sharing your thoughts, reporting bugs, or suggesting new features. Your
            feedback helps us create a better experience for everyone.
          </p>
        </div>

        <div className="space-y-3">
          <Label>What type of feedback do you have?</Label>
          <div className="grid grid-cols-2 gap-3">
            {feedbackTypes.map((type) => {
              const Icon = type.icon
              return (
                <Card
                  key={type.id}
                  className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedType === type.id ? "border-primary bg-primary/5" : ""
                  }`}
                  onClick={() => setSelectedType(type.id)}
                >
                  <div className="flex flex-col items-center gap-2 text-center">
                    <Icon className={`w-8 h-8 ${type.color}`} />
                    <span className="text-sm font-medium">{type.label}</span>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {selectedType && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email (optional)</Label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Brief summary" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="details">Details</Label>
              <Textarea id="details" placeholder="Please provide as much detail as possible..." rows={6} required />
            </div>

            <Button type="submit" className="w-full" size="lg">
              <Send className="w-4 h-4 mr-2" />
              Submit Feedback
            </Button>

            {submitted && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-600 text-center">
                Thank you for your feedback! We'll review it carefully.
              </div>
            )}
          </form>
        )}

        <div className="pt-6 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Tips for Great Feedback</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Be specific about what you experienced or what you'd like to see</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Include steps to reproduce if reporting a bug</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Explain how a feature would benefit your workflow</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Provide screenshots if relevant (you can include them in your description)</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}
