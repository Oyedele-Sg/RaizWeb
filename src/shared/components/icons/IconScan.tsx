"use client"
import { toast } from "@/components/ui/use-toast"
import { CurrentUserContext } from "@/providers/CurrentUserProvider"
import { userService } from "@/services"
import { setQRTrue } from "@/shared/redux/features"
import { useAppDispatch } from "@/shared/redux/types"
import { usePathname, useRouter } from "next/navigation"
import { FC, ReactElement, useContext } from "react"

export const IconScan: FC = (): ReactElement => {
  const Router = useRouter()
  const pathname = usePathname()
  const dispatch = useAppDispatch()

  const { currentUser } = useContext(CurrentUserContext)

  const handleClick = async () => {
    if (currentUser?.qr_code === null) {
      try {
        toast({
          title: "Generating User QR Code, Please Wait..",
          variant: "default",

          style: {
            backgroundColor: "#4B0082",
            color: "#fff",
            top: "20px",
            right: "20px",
          },
          duration: 2000,
        })
        await userService.generateQRCode()
        toast({
          title: "User QR Code Generated, Try again ",
          variant: "default",

          style: {
            backgroundColor: "#4B0082",
            color: "#fff",
            top: "20px",
            right: "20px",
          },
          duration: 3000,
        })
        Router.push("/pathname")
        return
      } catch (error) {
        toast({
          title: "Something Went Wrong",
          description: `${error}`,
          variant: "destructive",
          style: {
            backgroundColor: "#f44336",
            color: "#fff",
            top: "20px",
            right: "20px",
          },
          duration: 5000,
        })
      }
    }
    dispatch(setQRTrue())
  }

  return (
    <div className='  ' onClick={() => handleClick()}>
      <svg
        width='32'
        height='32'
        viewBox='0 0 32 32'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M2.6665 13C2.11984 13 1.6665 12.5466 1.6665 12V8.66663C1.6665 4.79996 4.81317 1.66663 8.6665 1.66663H11.9998C12.5465 1.66663 12.9998 2.11996 12.9998 2.66663C12.9998 3.21329 12.5465 3.66663 11.9998 3.66663H8.6665C5.9065 3.66663 3.6665 5.90663 3.6665 8.66663V12C3.6665 12.5466 3.21317 13 2.6665 13Z'
          fill='#4B0082'
        />
        <path
          d='M29.3333 13C28.7867 13 28.3333 12.5466 28.3333 12V8.66663C28.3333 5.90663 26.0933 3.66663 23.3333 3.66663H20C19.4533 3.66663 19 3.21329 19 2.66663C19 2.11996 19.4533 1.66663 20 1.66663H23.3333C27.1867 1.66663 30.3333 4.79996 30.3333 8.66663V12C30.3333 12.5466 29.88 13 29.3333 13Z'
          fill='#4B0082'
        />
        <path
          d='M23.3335 30.3334H21.3335C20.7868 30.3334 20.3335 29.88 20.3335 29.3334C20.3335 28.7867 20.7868 28.3334 21.3335 28.3334H23.3335C26.0935 28.3334 28.3335 26.0934 28.3335 23.3334V21.3334C28.3335 20.7867 28.7868 20.3334 29.3335 20.3334C29.8802 20.3334 30.3335 20.7867 30.3335 21.3334V23.3334C30.3335 27.2 27.1868 30.3334 23.3335 30.3334Z'
          fill='#4B0082'
        />
        <path
          d='M11.9998 30.3333H8.6665C4.81317 30.3333 1.6665 27.2 1.6665 23.3333V20C1.6665 19.4533 2.11984 19 2.6665 19C3.21317 19 3.6665 19.4533 3.6665 20V23.3333C3.6665 26.0933 5.9065 28.3333 8.6665 28.3333H11.9998C12.5465 28.3333 12.9998 28.7867 12.9998 29.3333C12.9998 29.88 12.5465 30.3333 11.9998 30.3333Z'
          fill='#4B0082'
        />
        <path
          d='M12 7H9.33333C7.81333 7 7 7.8 7 9.33333V12C7 13.5333 7.81333 14.3333 9.33333 14.3333H12C13.52 14.3333 14.3333 13.5333 14.3333 12V9.33333C14.3333 7.8 13.52 7 12 7Z'
          fill='#4B0082'
        />
        <path
          d='M22.6665 7H19.9998C18.4798 7 17.6665 7.8 17.6665 9.33333V12C17.6665 13.5333 18.4798 14.3333 19.9998 14.3333H22.6665C24.1865 14.3333 24.9998 13.5333 24.9998 12V9.33333C24.9998 7.8 24.1865 7 22.6665 7Z'
          fill='#4B0082'
        />
        <path
          d='M12 17.6666H9.33333C7.81333 17.6666 7 18.4666 7 20V22.6666C7 24.2 7.81333 25 9.33333 25H12C13.52 25 14.3333 24.2 14.3333 22.6666V20C14.3333 18.4666 13.52 17.6666 12 17.6666Z'
          fill='#4B0082'
        />
        <path
          d='M22.6665 17.6666H19.9998C18.4798 17.6666 17.6665 18.4666 17.6665 20V22.6666C17.6665 24.2 18.4798 25 19.9998 25H22.6665C24.1865 25 24.9998 24.2 24.9998 22.6666V20C24.9998 18.4666 24.1865 17.6666 22.6665 17.6666Z'
          fill='#4B0082'
        />
      </svg>
    </div>
  )
}
