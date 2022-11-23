import Icon from "components/widgets/Icon/Icon"
import errors from "constants/errors"
import { useError } from "hooks/useError"
import { useAssetStats, useHasUserLikedAsset } from "network/hooks"
import heart from "public/icons/heart.svg"
import { useCallback, useEffect } from "react"
import { post } from "services/axios"

interface Props {
  id: number
}

const Like: React.FC<Props> = ({ id }) => {
  const { data: hasLiked, mutate: hasLikedMutate } = useHasUserLikedAsset(id)
  const { data, mutate } = useAssetStats(id)

  const { dispatch } = useError()

  useEffect(() => {
    // Check if already liked and change icon color accordingly
    let svg = document.getElementById("like-heart-icon")
    if (svg) {
      if (hasLiked?.hasLiked) {
        svg?.classList.toggle("filled")
      } else {
        svg?.classList.remove("filled")
      }
    }
  }, [hasLiked])

  const handleLikeClicked = useCallback(async () => {
    let updateValue = "like"
    if (hasLiked?.hasLiked) {
      updateValue = "unlike"
    }

    try {
      if (typeof window !== "undefined") {
        const response = await post("/assets/stats", {
          assetID: id,
          updateValue,
        })
        if (response.status === 200) {
          mutate({
            id,
            views: data?.views || 0,
            likes: (data?.likes || 0) + 1,
          })
          hasLikedMutate({
            hasLiked: hasLiked?.hasLiked ? false : true,
          })
        } else {
          dispatch({
            type: "SET_ERROR",
            payload: errors.failed_to_heart_resource,
          })
        }
      }
    } catch (error: any) {
      dispatch({
        type: "SET_ERROR",
        payload: errors.failed_to_heart_resource,
      })
    }
  }, [data, dispatch, hasLiked, hasLikedMutate, id, mutate])
  return (
    <button onClick={handleLikeClicked}>
      <svg
        id="like-heart-icon"
        xmlns="http://www.w3.org/2000/svg"
        height="30px"
        width="30px"
        viewBox="0 0 612 792"
      >
        <path
          d="M611.721,288.299c-2.258-42.176-20.114-81.782-50.287-111.524c-30.557-30.119-70.43-46.708-112.27-46.708
      c-62.267,0-107.396,49.233-131.641,75.684c-3.743,4.085-8.13,8.87-11.183,11.79c-2.444-2.529-5.756-6.3-8.803-9.768
      c-22.142-25.222-68.223-77.704-134.688-77.704c-41.84,0-81.711,16.588-112.268,46.708C20.408,206.517,2.547,246.121,0.29,288.299
      c-2.248,42.107,8.521,78.746,34.92,118.803c20.888,31.701,75.961,93.605,133.927,150.543c29.856,29.326,57.336,54.18,79.466,71.873
      c35.936,28.729,49.7,32.413,57.674,32.413c7.476,0,21.614-3.352,57.895-32.332c22.079-17.637,49.463-42.451,79.194-71.76
      c57.445-56.63,112.318-118.617,133.443-150.743C594.576,380.072,614.6,342.151,611.721,288.299z"
        />
      </svg>
    </button>
  )
}

export default Like
