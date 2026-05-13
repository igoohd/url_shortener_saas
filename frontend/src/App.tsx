import Header from './components/Header'
import Hero from './components/Hero'

function App() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-18%] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-8%] h-[28rem] w-[28rem] rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute right-[-12%] top-[18%] h-[24rem] w-[24rem] rounded-full bg-accent-pink/20 blur-3xl" />
      </div>
      <Header />
      <Hero />
    </div>
  )
}

export default App
