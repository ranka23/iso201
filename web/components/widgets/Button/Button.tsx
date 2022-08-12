import css from "./Button.module.css"

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {}

const Button = (props: ButtonProps) => (
  <button className={css.button} {...props} />
)

export default Button
