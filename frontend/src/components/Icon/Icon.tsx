const Icon = ({
  icon,
  size = 24,
  color = icon.hex,
}: {
  icon: { svg: string; hex: string }
  size?: number
  color?: string
}) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: icon.svg }}
      style={{ width: size, height: size, fill: color }}
    />
  )
}

export default Icon
