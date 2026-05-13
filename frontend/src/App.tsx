import Header from './components/Header'
import Hero from './components/Hero'

function App() {
  return (
    <div className="relative z-0 flex min-h-screen flex-col overflow-hidden bg-background text-foreground">
      <div className="app-background pointer-events-none absolute inset-0 z-0">
        <div className="bg-grid" />
        <div className="bg-stars" />
        <div className="bg-noise" />
        <div className="bg-orb bg-orb-primary" />
        <div className="bg-orb bg-orb-secondary" />
        <div className="bg-orb bg-orb-tertiary" />
      </div>
      <div className="relative z-10">
        <Header />
        <Hero />
      </div>
    </div>
  )
}

export default App
