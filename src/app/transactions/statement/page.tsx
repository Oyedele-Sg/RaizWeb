"use client"
import { ContentWrap } from "@/components/budget"
import { CurrentUserContext } from "@/providers/CurrentUserProvider"
import { AuthButton, RegisterInput } from "@/shared"
import React, { useContext } from "react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { userService } from "@/services"
import { toast } from "@/components/ui/use-toast"
import { formatDateToISOStringWithMilliseconds } from "@/utils/helpers"
import moment from "moment"

function page() {
  const currentUser = useContext(CurrentUserContext)
  const [startDate, setStartDate] = React.useState<Date>()
  const [endDate, setEndDate] = React.useState<Date>()
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      if (!startDate || !endDate) {
        toast({
          title: "Something Went Wrong",
          description: `Date fields are required`,
          variant: "destructive",
          style: {
            backgroundColor: "#f44336",
            color: "#fff",
            top: "20px",
            right: "20px",
          },
          duration: 5000,
        })
        return
      }

      if (endDate <= startDate) {
        toast({
          title: "Something Went Wrong",
          description: `Invalid Date selection`,
          variant: "destructive",
          style: {
            backgroundColor: "#f44336",
            color: "#fff",
            top: "20px",
            right: "20px",
          },
          duration: 5000,
        })
        return
      }
      await userService.downloadStatement(
        moment(startDate).format("YYYY-MM-DDTHH:mm:ss.SSSSSS"),
        moment(endDate).format("YYYY-MM-DDTHH:mm:ss.SSSSSS")
      )
      toast({
        title: "Statment Successfully Downloaded",
        description: "Check your email for the statement",
        variant: "default",
        style: {
          backgroundColor: "#4B0082",
          color: "#fff",
          top: "20px",
          right: "20px",
        },
        duration: 5000,
      })
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
  return (
    <ContentWrap>
      <div className=' flex flex-col gap-1 '>
        <h2 className=' font-display__medium text-purple font-semi-mid '>
          {" "}
          Bank Statement{" "}
        </h2>
        <p className=' text-neutral-70  font-title__large '>Download</p>
      </div>

      <form onSubmit={(e) => handleSubmit(e)} className=' flex flex-col gap-9 '>
        <div className='flex gap-[43px] '>
          <div className='flex flex-col gap-4 '>
            <p className=' text-neutral-80 text-t-14 '>Start Date</p>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"ghost"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {startDate ? (
                    format(startDate, "PPP")
                  ) : (
                    <span>dd/mm/yyyy</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <Calendar
                  mode='single'
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className=' flex flex-col gap-4 '>
            <p className=' text-neutral-80 text-t-14 '>End Date</p>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"ghost"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {endDate ? format(endDate, "PPP") : <span>dd/mm/yyyy</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <Calendar
                  mode='single'
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <input
          className={` form-input pl-0   input_field-input`}
          value={currentUser.currentUser?.email}
          autoComplete='off'
          // onChange={onchange}
          disabled={true}
        />

        <AuthButton btnText='Send Statement' btnStyle='w-full' />
      </form>
    </ContentWrap>
  )
}

export default page
