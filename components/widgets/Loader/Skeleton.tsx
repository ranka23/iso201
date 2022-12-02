import css from "./Skeleton.module.css"

interface Props {
  width?: string | number
  height?: string | number
}

const Skeleton: React.FC<Props> = ({ height, width }) => {
  return <span className={css.loading} style={{
    width,
    height
  }} />
}

export default Skeleton
