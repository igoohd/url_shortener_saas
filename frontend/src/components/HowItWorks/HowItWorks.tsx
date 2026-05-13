import { Link2, Rocket, WandSparkles } from 'lucide-react'
import './HowItWorks.css'

const HowItWorks = () => {
  return (
    <div id="how-it-works" className="how-it-works-grid mt-12 w-full max-w-5xl text-left">
      <article className="how-it-works-card rounded-2xl p-5">
        <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted">
          <Link2 size={12} strokeWidth={2.4} /> Step 1
        </p>
        <h3 className="mt-3 text-lg font-semibold text-foreground">Paste a long URL</h3>
        <p className="mt-2 text-sm text-muted">
          Add any messy link with tracking parameters, folders, or long slugs.
        </p>
      </article>

      <article className="how-it-works-card rounded-2xl p-5">
        <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted">
          <WandSparkles size={12} strokeWidth={2.4} /> Step 2
        </p>
        <h3 className="mt-3 text-lg font-semibold text-foreground">Generate a short slug</h3>
        <p className="mt-2 text-sm text-muted">
          The link is trimmed into a clean, shareable format with one click.
        </p>
      </article>

      <article className="how-it-works-card rounded-2xl p-5">
        <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted">
          <Rocket size={12} strokeWidth={2.4} /> Step 3
        </p>
        <h3 className="mt-3 text-lg font-semibold text-foreground">Share everywhere</h3>
        <p className="mt-2 text-sm text-muted">
          Publish concise links in social posts, emails, docs, and campaigns.
        </p>
      </article>
    </div>
  )
}

export default HowItWorks
