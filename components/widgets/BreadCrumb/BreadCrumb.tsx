import Link from "next/link"
import React from "react"

interface Props {
  levels: Array<string>
}
const BreadCrumb: React.FC<Props> = ({ levels }) => {
  return (
    <div className="flex items-center">
      {levels.map((item, index) => {
        const temp = levels.slice(0, index + 1)
        let link = temp.join("/")
        return (
          <React.Fragment key={item}>
            <Link href={`/${link}`}>
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
