import './AppBackground.css'

const AppBackground = () => {
  return (
    <div className="app-background pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <div className="app-background__base-glow" />
      <div className="app-background__grid" />
      <div className="app-background__stars" />
      <div className="app-background__aurora" />
      <div className="app-background__rings" />
      <div className="app-background__beam app-background__beam--left" />
      <div className="app-background__beam app-background__beam--right" />
      <div className="app-background__blob app-background__blob--primary" />
      <div className="app-background__blob app-background__blob--secondary" />
      <div className="app-background__blob app-background__blob--tertiary" />
      <div className="app-background__noise" />
    </div>
  )
}

export default AppBackground