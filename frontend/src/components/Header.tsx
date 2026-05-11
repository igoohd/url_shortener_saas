const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-background text-text-primary border-b border-border">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 overflow-hidden rounded-xl">
          <img
            src="/logo.png"
            alt="UrlShortenerLogo"
            className="h-full w-full scale-[1.45] object-cover object-center"
          />
        </div>
      </div>
    </header>
  )
}

export default Header
