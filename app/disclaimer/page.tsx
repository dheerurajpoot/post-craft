"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 flex items-center gap-4 px-4 py-3 border-b border-border bg-card">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-bold text-foreground">Disclaimer</h1>
      </header>

      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Last updated: December 16, 2025</p>
          <p className="text-muted-foreground leading-relaxed">
            The information provided by PostCraft is for general informational purposes only. All information on the
            application is provided in good faith, however we make no representation or warranty of any kind, express or
            implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any
            information on the application.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">No Professional Advice</h3>
          <p className="text-muted-foreground leading-relaxed">
            The content created using PostCraft should not be considered professional design advice. Users are
            responsible for ensuring their content meets their specific needs and complies with platform-specific
            guidelines.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Third-Party Content</h3>
          <p className="text-muted-foreground leading-relaxed">
            PostCraft provides access to third-party images through Pexels API. We are not responsible for the content,
            accuracy, or licensing terms of these third-party resources. Users must verify the licensing terms before
            using any third-party content.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Copyright and Trademarks</h3>
          <p className="text-muted-foreground leading-relaxed">
            Users are solely responsible for ensuring that their content does not infringe on any copyrights,
            trademarks, or other intellectual property rights. PostCraft does not monitor user-generated content and
            cannot be held liable for any infringement.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">External Links</h3>
          <p className="text-muted-foreground leading-relaxed">
            PostCraft may contain links to external websites that are not provided or maintained by us. We do not
            guarantee the accuracy, relevance, timeliness, or completeness of any information on these external
            websites.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Errors and Omissions</h3>
          <p className="text-muted-foreground leading-relaxed">
            While we strive to provide accurate and up-to-date information, PostCraft makes no warranties about the
            completeness, reliability, or accuracy of this information. Any action you take upon the information on our
            application is strictly at your own risk.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Fair Use</h3>
          <p className="text-muted-foreground leading-relaxed">
            PostCraft may use copyrighted material that has not always been specifically authorized by the copyright
            owner for demonstration or educational purposes. We believe this constitutes fair use under applicable
            copyright law.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Changes to Disclaimer</h3>
          <p className="text-muted-foreground leading-relaxed">
            We reserve the right to update or change this disclaimer at any time without prior notice. Your continued
            use of the application after any changes indicates your acceptance of the new disclaimer.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Contact Us</h3>
          <p className="text-muted-foreground leading-relaxed">
            If you have any questions about this disclaimer, please contact us through our Contact page.
          </p>
        </div>
      </div>
    </main>
  )
}
