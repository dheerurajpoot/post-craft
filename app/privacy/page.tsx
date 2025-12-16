"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 flex items-center gap-4 px-4 py-3 border-b border-border bg-card">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-bold text-foreground">Privacy Policy</h1>
      </header>

      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Last updated: December 16, 2025</p>
          <p className="text-muted-foreground leading-relaxed">
            At PostCraft, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect
            your information when you use our application.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Information We Collect</h3>
          <p className="text-muted-foreground leading-relaxed">
            PostCraft operates primarily using local storage in your browser. We do not collect or store personal
            information on our servers. All your designs, preferences, and data are stored locally on your device.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Local Storage</h3>
          <p className="text-muted-foreground leading-relaxed">
            We use browser local storage to save your designs, templates, and preferences. This data remains on your
            device and is not transmitted to our servers. You can clear this data at any time through your browser
            settings.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Third-Party Services</h3>
          <p className="text-muted-foreground leading-relaxed">
            PostCraft integrates with Pexels API to provide stock images. When you search for images, your search
            queries are sent to Pexels. Please refer to Pexels' privacy policy for information on how they handle your
            data.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Cookies</h3>
          <p className="text-muted-foreground leading-relaxed">
            We do not use cookies for tracking purposes. Any cookies used are strictly necessary for the application to
            function properly.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Data Security</h3>
          <p className="text-muted-foreground leading-relaxed">
            Since all your data is stored locally on your device, you have complete control over its security. We
            recommend using secure devices and keeping your browser updated to ensure the safety of your data.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Changes to This Policy</h3>
          <p className="text-muted-foreground leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last updated" date.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Contact Us</h3>
          <p className="text-muted-foreground leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us through our Contact page.
          </p>
        </div>
      </div>
    </main>
  )
}
