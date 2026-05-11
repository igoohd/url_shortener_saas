import Icon from './Icon'
import { siReact } from 'simple-icons/icons'

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-background text-text-primary">
      <div className="text-center">
        <div className="mb-4 text-sm font-semibold text-secondary flex items-center justify-center gap-2">
          <Icon icon={siReact} size={24} />
          <span>Fast. Simple. Reliable.</span>
        </div>
        <h1 className="text-5xl font-extrabold text-primary sm:text-6xl md:text-7xl">
          Shorten your URL
        </h1>
        <p className="mt-4 text-lg text-text-muted">
          Transform long, messy links into short, powerful URLs in a single click.
        </p>
        <div className="mt-8 flex flex-col items-center">
          <input
            type="url"
            placeholder="Paste your long URL here..."
            className="w-full max-w-md px-4 py-2 text-text-primary bg-surface border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="mt-4 px-6 py-2 bg-primary text-background font-semibold rounded-md hover:bg-opacity-90 focus:ring-2 focus:ring-secondary">
            Shorten URL
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
