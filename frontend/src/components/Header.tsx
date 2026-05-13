import { siGithub } from 'simple-icons/icons'
import Icon from './Icon'

const Header = () => {
  return (
    <header className="sticky top-0 z-20 bg-transparent backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 overflow-hidden">
            <img
              src="/logo.png"
              alt="UrlShortenerLogo"
              className="h-full w-full scale-[1.45] object-cover object-center"
            />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-secondary">SaaS Platform</p>
            <h1 className="text-lg font-semibold tracking-tight text-foreground">UrlShortener</h1>
          </div>
        </div>

        <nav className="hidden items-center gap-7 text-sm text-muted md:flex">
          <a
            href="https://github.com/igoohd/url_shortener_saas"
            target="_blank"
            rel="noreferrer"
            className="glass-soft inline-flex items-center gap-2 rounded-full px-4 py-2 text-foreground "
          >
            <Icon icon={siGithub} size={14} color="var(--color-secondary)" />
            GitHub
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header
