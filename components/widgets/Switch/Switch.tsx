import css from "./index.module.css"

interface Props {}

const Switch: React.FC<Props> = () => {
  return (
    <label className={css.switch}>
      <input type="checkbox" />
      <span className={`${css.slider} ${css.round}`}></span>
    </label>
  )
}

export default Switch
