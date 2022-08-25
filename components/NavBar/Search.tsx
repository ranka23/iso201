import Icon from "../widgets/Icon/Icon"
import search from 'public/icons/search.svg'

const Search = () => {
  return (
    <div className="ml-4 mr-6 w-full max-w-6xl flex items-center bg-gray-100 rounded-full">
      <Icon className="opacity-40" src={search} height={20} />
      <input
        className="w-full pr-4 font-normal bg-transparent h-11 outline-0"
        placeholder="Search for high-resolution content"
      />
    </div>
  )
}

export default Search
