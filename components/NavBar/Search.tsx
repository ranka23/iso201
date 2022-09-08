import Icon from "widgets/Icon/Icon"
import search from "public/icons/search.svg"

interface Props {
  rounded?: boolean
  margin?: boolean
  wider?: boolean
}

const Search: React.FC<Props> = ({ rounded = true, margin = true, wider = false }) => {
  return (
    <div
      className={`${
        margin ? "ml-4 mr-6 " : ""
      }w-full flex items-center bg-gray-100 ${
        rounded ? "rounded-full" : "rounded"
      } ${wider ? "md:w-[800px] md:h-[48px]" : "max-w-6xl"}`}
    >
      <Icon className="opacity-40" src={search} height={20} />
      <input
        className="w-full pr-4 font-normal bg-transparent h-11 outline-none"
        placeholder="Search for high-resolution content"
      />
    </div>
  )
}

export default Search
