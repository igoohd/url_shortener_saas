import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AlertTriangle, ExternalLink, Rocket, Scissors, Sparkles } from 'lucide-react'
import UrlService from '../../services/urlService'
import HowItWorks from '../HowItWorks/HowItWorks'
import './Hero.css'

const HEADLINE_WORDS = ['Shorten', 'Simplify', 'Clean', 'Share', 'Transform']

const Hero = () => {
  const [longUrl, setLongUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [wordIndex, setWordIndex] = useState(0)
  const [wordSlotWidth, setWordSlotWidth] = useState<number | null>(null)
  const wordMeasureRef = useRef<HTMLSpanElement | null>(null)
  const activeWord = HEADLINE_WORDS[wordIndex]

  useLayoutEffect(() => {
    if (!wordMeasureRef.current) {
      return
    }

    setWordSlotWidth(wordMeasureRef.current.getBoundingClientRect().width)
  }, [activeWord])

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setWordIndex((previous) => (previous + 1) % HEADLINE_WORDS.length)
    }, 3500)

    return () => window.clearInterval(intervalId)
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setShortUrl('')

    if (!longUrl.trim()) {
      setError('Please enter a valid URL before shortening.')
      return
    }

    setLoading(true)

    try {
      const response = await UrlService.shortenUrl(longUrl)
      setShortUrl(response.shortenedUrl)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to shorten URL'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative flex flex-1 items-center px-6 py-10 sm:py-14">
      <section className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center text-center">
        <span className="neon-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
          <Sparkles size={14} strokeWidth={2.2} />
          Fast. Simple. Reliable.
        </span>

        <h2 className="display-hero mt-6 max-w-4xl text-4xl text-foreground sm:text-5xl md:text-6xl">
          <span className="rotating-word-slot" style={{ width: wordSlotWidth ? `${wordSlotWidth}px` : 'auto' }}>
            <span
              key={activeWord}
              className="rotating-word bg-linear-to-r from-secondary via-primary to-accent-pink bg-clip-text text-transparent"
            >
              {activeWord}
            </span>
          </span>{' '}
          your URL
          <span ref={wordMeasureRef} className="rotating-word-measure" aria-hidden="true">
            {activeWord}
          </span>
        </h2>

        <p className="mt-5 max-w-2xl text-base text-muted sm:text-lg">
          Transform long, messy links into short, powerful URLs in a single click.
        </p>

        <aside className="portfolio-note mt-6 w-full max-w-3xl rounded-2xl p-4 text-left backdrop-blur-xl">
          <div className="flex items-start gap-3">
            <div className="p-2">
              <AlertTriangle size={14} className="text-primary" strokeWidth={2.2} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Portfolio project
              </p>
              <p className="mt-2 text-sm text-muted">
                This page is a portfolio demo. For architecture details, docs, and backend setup,
                check the repository on{' '}
                <a
                  href="https://github.com/igoohd/url_shortener_saas"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-secondary transition-colors hover:text-foreground"
                >
                  GitHub
                  <ExternalLink size={12} strokeWidth={2.2} />
                </a>
                .
              </p>
            </div>
          </div>
        </aside>

        <form
          onSubmit={handleSubmit}
          className="glass-panel mt-10 w-full max-w-3xl rounded-2xl p-4 text-left sm:p-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row">
            <input
              type="url"
              value={longUrl}
              onChange={(event) => setLongUrl(event.target.value)}
              placeholder="https://very-long-and-messy-link.com/path?query=params"
              className="neon-input w-full flex-1 rounded-2xl border border-border bg-background/70 px-5 py-3 text-sm text-foreground outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="neon-button inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Scissors size={14} strokeWidth={2.2} />
              {loading ? 'Shortening...' : 'Shorten URL'}
            </button>
          </div>

          {error && <p className="mt-3 text-sm text-error">{error}</p>}

          {shortUrl && (
            <div
              key={shortUrl}
              className="result-card-enter mt-5 rounded-2xl border border-success/35 bg-success/10 p-4"
            >
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-success">
                <Rocket size={13} strokeWidth={2.2} />
                Short URL ready
              </p>
              <p className="mt-2 break-all text-base font-semibold text-foreground">{shortUrl}</p>
            </div>
          )}
        </form>

        <HowItWorks />
      </section>
    </main>
  )
}

export default Hero
