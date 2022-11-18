import Search from "components/NavBar/Search"
import css from "./Hero.module.css"

interface Props {
  topHeader: string
  largeHeader: string
  description: string
  bgURL: string
  showSearch?: boolean
}

const Hero: React.FC<Props> = ({
  description,
  largeHeader,
  topHeader,
  bgURL,
  showSearch = true,
}) => {
  const styles = {
    background: `url(${bgURL})`,
  }
  return (
    <div style={styles} className={css.container}>
      <div>
        <span className="text-3xl font-semibold mb-1">{topHeader}</span>
        <h1 className="text-5xl font-bold mb-4 -ml-1">{largeHeader}</h1>
        <h4 className="text-lg font-medium max-w-[320px] mb-8">
          {description}
        </h4>
        {showSearch ? <Search margin={false} rounded={false} wider /> : null}
      </div>
    </div>
  )
}

export default Hero
