import millify from "millify"
import { useAssetStats } from "network/hooks"
import Like from "./Like"

interface Props {
  id: number
}

const LikeWithCount: React.FC<Props> = ({ id }) => {
  const { data } = useAssetStats(id)
  return (
    <div className="flex items-center mr-8">
      <Like id={id} />
      {data?.likes && data?.likes !== 0 ? (
        <span className="ml-1 text-2xl font-medium">{millify(data.likes)}</span>
      ) : null}
    </div>
  )
}

export default LikeWithCount
