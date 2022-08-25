import css from "./Input.module.css"

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {}

const Input = (props: InputProps) => <input className={css.input} {...props} />

export default Input
