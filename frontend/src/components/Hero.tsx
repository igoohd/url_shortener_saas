import { useState } from 'react'
import type { ChangeEvent } from 'react'
import { AlertTriangle, Link2, Rocket, Scissors, Sparkles, WandSparkles } from 'lucide-react'

const Hero = () => {
  const [longUrl, setLongUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!longUrl.trim()) {
      setError('Please enter a valid URL before shortening.')
      setShortUrl('')
      return
    }

    try {
      const parsedUrl = new URL(longUrl)
      const slug = Math.random().toString(36).slice(2, 8)
      setShortUrl(`https://urlshortener.app/${slug}`)
      setError('')
      setLongUrl(parsedUrl.href)
    } catch {
      setError('URL format looks invalid. Try including https://')
      setShortUrl('')
    }
  }

  return (
    <main className="relative flex flex-1 items-center px-6 py-10 sm:py-14">
      <section className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary shadow-[var(--shadow-badge-glow)]">
          <Sparkles size={14} strokeWidth={2.2} />
          Fast. Simple. Reliable.
        </span>

        <h2 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          <span className="bg-linear-to-r from-secondary via-primary to-accent-pink bg-clip-text text-transparent">
            Shorten
          </span>{' '}
          your URL
        </h2>

        <p className="mt-5 max-w-2xl text-base text-muted sm:text-lg">
          Transform long, messy links into short, powerful URLs in a single click.
        </p>

        <aside className="mt-6 w-full max-w-3xl rounded-2xl border border-accent-pink/25 bg-accent-pink/10 p-4 text-left backdrop-blur-xl">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-lg border border-accent-pink/30 bg-background/60 p-2">
              <AlertTriangle size={14} className="text-accent-pink" strokeWidth={2.2} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-pink">
                Portfolio project
              </p>
              <p className="mt-2 text-sm text-muted">
                This page is a portfolio demo. For architecture details, roadmap, and backend setup,
                check the repository on GitHub .
              </p>
            </div>
          </div>
        </aside>

        <form
          onSubmit={handleSubmit}
          className="mt-10 w-full max-w-3xl rounded-3xl border border-border bg-surface/70 p-4 text-left shadow-[var(--shadow-card-depth)] backdrop-blur-2xl sm:p-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row">
            <input
              type="url"
              value={longUrl}
              onChange={(event) => setLongUrl(event.target.value)}
              placeholder="https://very-long-and-messy-link.com/path?query=params"
              className="w-full flex-1 rounded-2xl border border-border bg-background/70 px-5 py-3 text-sm text-foreground outline-none transition focus:border-secondary/70"
            />
            <button
              type="submit"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-primary/90"
            >
              <Scissors size={14} strokeWidth={2.2} />
              Shorten URL
            </button>
          </div>

          {error && <p className="mt-3 text-sm text-error">{error}</p>}

          {shortUrl && (
            <div className="mt-5 rounded-2xl border border-success/35 bg-success/10 p-4">
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-success">
                <Rocket size={13} strokeWidth={2.2} />
                Short URL ready
              </p>
              <p className="mt-2 break-all text-base font-semibold text-foreground">{shortUrl}</p>
            </div>
          )}
        </form>

        <div
          id="how-it-works"
          className="mt-12 grid w-full max-w-5xl gap-4 text-left md:grid-cols-3"
        >
          <article className="rounded-2xl border border-border bg-surface/65 p-5">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-secondary">
              <Link2 size={12} strokeWidth={2.4} /> Step 1
            </p>
            <h3 className="mt-3 text-lg font-semibold text-foreground">Paste a long URL</h3>
            <p className="mt-2 text-sm text-muted">
              Add any messy link with tracking parameters, folders, or long slugs.
            </p>
          </article>
          <article className="rounded-2xl border border-border bg-surface/65 p-5">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-secondary">
              <WandSparkles size={12} className="text-primary" strokeWidth={2.4} /> Step 2
            </p>
            <h3 className="mt-3 text-lg font-semibold text-foreground">Generate a short slug</h3>
            <p className="mt-2 text-sm text-muted">
              The link is trimmed into a clean, shareable format with one click.
            </p>
          </article>
          <article className="rounded-2xl border border-border bg-surface/65 p-5">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-secondary">
              <Rocket size={12} className="text-accent-pink" strokeWidth={2.4} /> Step 3
            </p>
            <h3 className="mt-3 text-lg font-semibold text-foreground">Share everywhere</h3>
            <p className="mt-2 text-sm text-muted">
              Publish concise links in social posts, emails, docs, and campaigns.
            </p>
          </article>
        </div>
      </section>
    </main>
  )
}

export default Hero
