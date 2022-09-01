interface Props {
  href: string
  children: React.ReactNode
}

const ColorLink: React.FC<Props> = ({ href, children }) => {
  return (
    <a
      className="text-blue-500 underline"
      target="_blank"
      rel="noreferrer"
      href={href}
    >
      {children}
    </a>
  )
}

export default ColorLink
