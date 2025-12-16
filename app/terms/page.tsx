"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 flex items-center gap-4 px-4 py-3 border-b border-border bg-card">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-bold text-foreground">Terms of Service</h1>
      </header>

      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Last updated: December 16, 2025</p>
          <p className="text-muted-foreground leading-relaxed">
            Welcome to PostCraft. By using our application, you agree to these Terms of Service. Please read them
            carefully.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Acceptance of Terms</h3>
          <p className="text-muted-foreground leading-relaxed">
            By accessing and using PostCraft, you accept and agree to be bound by the terms and provisions of this
            agreement. If you do not agree to these terms, please do not use our service.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Use License</h3>
          <p className="text-muted-foreground leading-relaxed">
            PostCraft grants you a personal, non-transferable, non-exclusive license to use the application for creating
            social media content. You may not modify, distribute, or reverse engineer the application.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">User Content</h3>
          <p className="text-muted-foreground leading-relaxed">
            You retain all rights to the content you create using PostCraft. However, you are responsible for ensuring
            that your content does not infringe on any third-party rights, including copyright, trademark, or privacy
            rights.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Third-Party Content</h3>
          <p className="text-muted-foreground leading-relaxed">
            Images provided through Pexels are subject to Pexels' licensing terms. You are responsible for complying
            with these terms when using images in your designs.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Prohibited Uses</h3>
          <p className="text-muted-foreground leading-relaxed">You may not use PostCraft to:</p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Create content that is illegal, harmful, or offensive</li>
            <li>Infringe on intellectual property rights of others</li>
            <li>Harass, abuse, or harm another person</li>
            <li>Distribute malware or engage in phishing</li>
            <li>Violate any applicable laws or regulations</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Disclaimer of Warranties</h3>
          <p className="text-muted-foreground leading-relaxed">
            PostCraft is provided "as is" without any warranties, expressed or implied. We do not guarantee that the
            application will be error-free or uninterrupted.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Limitation of Liability</h3>
          <p className="text-muted-foreground leading-relaxed">
            PostCraft shall not be liable for any indirect, incidental, special, consequential, or punitive damages
            resulting from your use of or inability to use the application.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Changes to Terms</h3>
          <p className="text-muted-foreground leading-relaxed">
            We reserve the right to modify these terms at any time. Continued use of PostCraft after changes constitutes
            acceptance of the new terms.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Contact Information</h3>
          <p className="text-muted-foreground leading-relaxed">
            For questions about these Terms of Service, please contact us through our Contact page.
          </p>
        </div>
      </div>
    </main>
  )
}
