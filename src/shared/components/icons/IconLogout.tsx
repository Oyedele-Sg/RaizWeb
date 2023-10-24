"use client"
import { useRouter } from "next/navigation"
import { FC, ReactElement } from "react"

export const IconLogout: FC = (): ReactElement => {
  const Router = useRouter()
  return (
    <div className='' onClick={() => Router.push("/dashboard")}>
      <svg
        width='32'
        height='32'
        viewBox='0 0 32 32'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g id='vuesax/bold/logout'>
          <g id='logout'>
            <path
              id='Vector'
              d='M9.6 29.3333H13.0667C17.3333 29.3333 20 26.6666 20 22.3999V16.9999H11.6667C11.12 16.9999 10.6667 16.5466 10.6667 15.9999C10.6667 15.4533 11.12 14.9999 11.6667 14.9999L20 14.9999L20 9.59992C20 5.33325 17.3333 2.66658 13.0667 2.66658H9.61333C5.34667 2.66658 2.68 5.33325 2.68 9.59992L2.68 22.3999C2.66667 26.6666 5.33333 29.3333 9.6 29.3333Z'
              fill='#4B0082'
            />
            <path
              id='Vector_2'
              d='M25.9181 17L23.1581 19.76C22.9581 19.96 22.8648 20.2134 22.8648 20.4667C22.8648 20.72 22.9581 20.9867 23.1581 21.1734C23.5448 21.56 24.1848 21.56 24.5715 21.1734L29.0381 16.7067C29.4248 16.32 29.4248 15.68 29.0381 15.2934L24.5715 10.8267C24.1848 10.44 23.5448 10.44 23.1581 10.8267C22.7715 11.2134 22.7715 11.8534 23.1581 12.24L25.9181 15H19.9981V17H25.9181Z'
              fill='#4B0082'
            />
          </g>
        </g>
      </svg>
    </div>
  )
}
