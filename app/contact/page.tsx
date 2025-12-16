"use client"

import type React from "react"

import { ArrowLeft, Mail, MessageSquare, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useState } from "react"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 flex items-center gap-4 px-4 py-3 border-b border-border bg-card">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-bold text-foreground">Contact Us</h1>
      </header>

      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Get in Touch</h2>
          <p className="text-muted-foreground leading-relaxed">
            Have questions, suggestions, or need help? We'd love to hear from you. Fill out the form below and we'll get
            back to you as soon as possible.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Your name" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="your@email.com" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="What's this about?" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Your message..." rows={6} required />
          </div>

          <Button type="submit" className="w-full" size="lg">
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </Button>

          {submitted && (
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-600 text-center">
              Thank you! Your message has been sent successfully.
            </div>
          )}
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
          <div className="p-4 bg-card border border-border rounded-lg">
            <Mail className="w-6 h-6 mb-2 text-primary" />
            <h3 className="font-semibold text-foreground mb-1">Email</h3>
            <p className="text-sm text-muted-foreground">support@postcraft.app</p>
          </div>

          <div className="p-4 bg-card border border-border rounded-lg">
            <MessageSquare className="w-6 h-6 mb-2 text-primary" />
            <h3 className="font-semibold text-foreground mb-1">Live Chat</h3>
            <p className="text-sm text-muted-foreground">Available 9 AM - 6 PM EST</p>
          </div>
        </div>
      </div>
    </main>
  )
}
