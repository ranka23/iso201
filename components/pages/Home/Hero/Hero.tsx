import Search from "components/NavBar/Search"
import css from "./Hero.module.css"

interface Props {
  title: string
  heading: string
  description: string
  bgURL: string
}

const Hero: React.FC<Props> = ({ description, heading, title, bgURL }) => {
  const styles = {
    background: `url(${bgURL})`
  }
  return (
    <div style={styles} className={css.container}>
      <div>
        <span className="text-3xl font-semibold mb-1">{title}</span>
        <h1 className="text-5xl font-bold mb-4 -ml-1">{heading}</h1>
        <h4 className="text-lg font-medium max-w-[320px] mb-8">{description}</h4>
        <Search margin={false} rounded={false} wider />
      </div>
    </div>
  )
}

export default Hero
