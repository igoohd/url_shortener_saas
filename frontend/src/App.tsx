import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import AppBackground from './components/AppBackground/AppBackground'

function App() {
  return (
    <div className="relative z-0 flex min-h-screen flex-col overflow-hidden bg-background text-foreground">
      <AppBackground />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <Hero />
      </div>
    </div>
  )
}

export default App
