import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"

interface Props {
  levels: Array<string>
  useButton?: boolean
}

const BreadCrumb: React.FC<Props> = ({ levels, useButton = false }) => {
  const router = useRouter()
  if (useButton) {
    return (
      <div className="flex items-center">
        {levels.map((item, index) => {
          const handleButtonNavigation = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.stopPropagation()
            const temp = levels.slice(0, index + 1)
            let link = temp.join("/")
            router.push(`/${link}`)
          }
          return (
            <React.Fragment key={item}>
              <button onClick={handleButtonNavigation} className="text-sky-700">
                {item}
              </button>
              {index !== levels.length - 1 ? (
                <span className="mx-1">/</span>
              ) : (
                ""
              )}
            </React.Fragment>
          )
        })}
      </div>
    )
  }

  return (
    <div className="flex items-center">
      {levels.map((item, index) => {
        const temp = levels.slice(0, index + 1)
        let link = temp.join("/")
        return (
          <React.Fragment key={item}>
            <Link passHref href={`/${link}`}>
              <a className="text-sky-700">{item}</a>
            </Link>
            {index !== levels.length - 1 ? <span className="mx-1">/</span> : ""}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default BreadCrumb
