"use client"
import { ContentWrap } from "@/components/savings/ContentWrap"
import {
  BtnMain,
  CreateFlexLoanDataInterface,
  CreateTermLoanDataInterface,
  Loading,
  RegisterInput,
  RegisterTextArea,
  TermLoanCategoryInterface,
  createFlexLoanSchema,
} from "@/shared"
import { yupResolver } from "@hookform/resolvers/yup"
import { current } from "@reduxjs/toolkit"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import moment from "moment"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { formatDate } from "@/utils/helpers"
import { toast } from "@/components/ui/use-toast"
import { userService } from "@/services"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import { useAppDispatch } from "@/shared/redux/types"
import { getLoanData } from "@/shared/redux/features/flex-loan"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from "next/image"
import { DocumentUploadComponent } from "@/components/loan"

export default function page() {
  const Router = useRouter()
  const dispatch = useAppDispatch()

  const [identityfile, setIdentityFile] = useState<File | null>()
  console.log("identityfile", identityfile)
  const [identityURL, setIdentityURL] = useState<string>("")
  console.log("identityURL", identityURL)
  const [utilityfile, setUtilityFile] = useState<File | null>(null)
  const [utilityURL, setUtilityURL] = useState<string>("")
  console.log("utilityURL", utilityURL)
  const [file, setFile] = useState<File | null>(null)
  const [imageURL, setImageURL] = useState<string>("")
  console.log("imageURL", imageURL)

  const [loanCategory, setLoanCategory] =
    useState<TermLoanCategoryInterface[]>()
  const [currentStep, setCurrentStep] = useState(1)

  const methods = useForm<CreateTermLoanDataInterface>({
    defaultValues: {
      term_loan_category_id: null,
      loan_amount: null,
      loan_reason: "",
      term_loan_supporting_documents: {
        identity_document_url: "",
        utility_bill_url: "",
        bank_statement_url: "",
      },
    },

    mode: "onBlur",
  })

  const [endDate, setEndDate] = useState<Date>()
  console.log("endDate", endDate)

  const handleNavigation = () => {
    Router.push("/loan/hub")
  }
  const handleSubmit = async (data: CreateTermLoanDataInterface) => {
    try {
      dispatch(setLoadingTrue())
      const reponse = await userService.applyTermLoan(data)
      dispatch(getLoanData(reponse))
      dispatch(setLoadingFalse())
      Router.push("/loan/term-loan/success")
      dispatch(setLoadingFalse())
    } catch (error) {
      dispatch(setLoadingFalse())

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

  const getData = async () => {
    const res = await userService.getTermLoanCategory()
    setLoanCategory(res)
  }

  useEffect(() => {
    getData()
  }, [])

  const handleImageChange = async () => {
    try {
      // Check if file exists
      if (!file) {
        return
      }

      dispatch(setLoadingTrue())

      const formData = new FormData()
      formData.append("file", file)
      formData.append("type", file.type)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        headers: {
          // You don't need to set Content-Type for FormData
          // "Content-Type": "multipart/form-data",
          // "Access-Control-Allow-Origin" header is not needed here
        },
      })

      if (response.ok) {
        const data = await response.json()
        setImageURL(data.url)
        methods.setValue(
          "term_loan_supporting_documents.identity_document_url",
          data.url
        )
      }

      dispatch(setLoadingFalse())

      setFile(null)
    } catch (err) {
      console.error(err)
      dispatch(setLoadingFalse())
    }
  }
  const handleIdentifyChange = async () => {
    try {
      // Check if identityfile exists
      if (!identityfile) {
        return
      }

      dispatch(setLoadingTrue())

      const formData = new FormData()
      formData.append("file", identityfile)
      formData.append("type", identityfile.type)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        headers: {
          // You don't need to set Content-Type for FormData
          // "Content-Type": "multipart/form-data",
          // "Access-Control-Allow-Origin" header is not needed here
        },
      })

      if (response.ok) {
        const data = await response.json()
        setIdentityURL(data.url)
        methods.setValue(
          "term_loan_supporting_documents.bank_statement_url",
          data.url
        )
      }

      dispatch(setLoadingFalse())

      setIdentityFile(null)
    } catch (err) {
      console.error(err)
      dispatch(setLoadingFalse())
    }
  }

  const handleUtilityChange = async () => {
    try {
      // Check if utilityfile exists
      if (!utilityfile) {
        return
      }
      dispatch(setLoadingTrue())

      const formData = new FormData()
      formData.append("file", utilityfile)
      formData.append("type", utilityfile.type)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        headers: {
          // You don't need to set Content-Type for FormData
          // "Content-Type": "multipart/form-data",
          // "Access-Control-Allow-Origin" header is not needed here
        },
      })

      if (response.ok) {
        const data = await response.json()
        setUtilityURL(data.url)
        methods.setValue(
          "term_loan_supporting_documents.utility_bill_url",
          data.url
        )
      }

      dispatch(setLoadingFalse())

      setUtilityFile(null)
    } catch (err) {
      console.error(err)
      dispatch(setLoadingFalse())
    }
  }

  useEffect(() => {
    handleImageChange()
  }, [file])
  useEffect(() => {
    handleIdentifyChange()
  }, [identityfile])

  useEffect(() => {
    handleUtilityChange()
  }, [utilityfile])

  return (
    <>
      <Loading />
      <div className=''>
        <ContentWrap handleNavigation={handleNavigation} bg='bg-loan-bg'>
          <div className=' flex flex-col gap-9 '>
            <div className=''>
              <h1 className='  font-display__medium text-purple capitalize '>
                Term loans
              </h1>
              <p className=' text-neutral-70 font-title__large '>setup</p>
            </div>
            <div className=''>
              <FormProvider {...methods}>
                <form
                  onSubmit={methods.handleSubmit(handleSubmit)}
                  className=' '
                >
                  {currentStep === 1 && (
                    <div className=' flex flex-col gap-6   '>
                      <RegisterInput
                        name='loan_amount'
                        label='Amount of Loan'
                        type='number'
                        inputPlaceholder=' Minimum amount is ₦100,000 '
                        rules={{ required: "Loan Amount is required" }}
                      />
                      <RegisterTextArea
                        name='loan_reason'
                        label='Reason for the Loan'
                        rules={{ required: "Loan Reason is required" }}
                        inputPlaceholder='Enter here'
                      />
                      <div className=''>
                        <label
                          className={`font-label__large text-neutral-90 capitalize  `}
                        >
                          Loan Category
                        </label>
                        <Select
                          onValueChange={(value) => {
                            const selectedCategory = loanCategory?.find(
                              (item) =>
                                item.term_loan_category_id.toString() === value
                            )
                            methods.setValue(
                              "term_loan_category_id",
                              selectedCategory?.term_loan_category_id as number
                            )
                          }}
                        >
                          <SelectTrigger className='w-full outline-none rounded-none border-b-purple border-[1px] border-t-0 border-x-0  input_field-input capitalize  z-50 '>
                            <SelectValue
                              placeholder='Select a category'
                              className='   '
                            />
                          </SelectTrigger>
                          <SelectContent className=' bg-neutral-20 text-neutral-90 h-[200px] overflow-auto z-50 '>
                            {loanCategory?.map((item, index) => (
                              <SelectItem
                                key={index}
                                value={item.term_loan_category_id.toString()}
                                className=' hover:bg-neutral-50 z-50 '
                              >
                                {item.term_loan_category_name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {methods.formState.errors.term_loan_category_id && (
                          <span className='error-message'>
                            {
                              methods.formState.errors.term_loan_category_id
                                .message
                            }
                          </span>
                        )}
                      </div>
                      <BtnMain
                        btnText='Next'
                        btnStyle=' w-full text-center text-grey  btn-gradient-loan '
                        onClick={() => setCurrentStep(2)}
                      />
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className=' flex flex-col gap-6   '>
                      <div className='  flex flex-col gap-4   '>
                        <h4
                          className={`font-label__large text-neutral-90 capitalize  `}
                        >
                          ID Document (ID or Passport)
                        </h4>
                        <label
                          className={`
                               relative w-full rounded-lg border border-neutral-90 py-[19px]  flex items-center justify-center  ${
                                 !(identityURL === "") && "bg-neutral-20"
                               }
                         `}
                          htmlFor='identity_image_url'
                        >
                          <input
                            type='file'
                            name='identity_image_url'
                            id='identity_image_url'
                            className=' hidden w-full h-full opacity-0 cursor-default '
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setIdentityFile(
                                e.target.files ? e.target.files[0] : null
                              )
                            }
                          />
                          {!(identityURL === "") ? (
                            <DocumentUploadComponent
                              changeFunc={() => {
                                const input = document.getElementById(
                                  "identity_image_url"
                                ) as HTMLInputElement
                                input.click()
                              }}
                              previewFunc={() => {}}
                            />
                          ) : (
                            <Image
                              src={`/illustrations/upload.svg`}
                              alt=''
                              height={48}
                              width={48}
                            />
                          )}
                        </label>
                      </div>
                      <div className='  flex flex-col gap-4   '>
                        <h4
                          className={`font-label__large text-neutral-90 capitalize  `}
                        >
                          Bank Statement
                        </h4>
                        <label
                          className={`
                               relative w-full rounded-lg border border-neutral-90 py-[19px]  flex items-center justify-center ${
                                 !(imageURL === "") && "bg-neutral-20"
                               }
                         `}
                          htmlFor='image_url'
                        >
                          <input
                            type='file'
                            name='image_url'
                            id='image_url'
                            className=' absolute w-full h-full opacity-0 cursor-default '
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFile(e.target.files ? e.target.files[0] : null)
                            }
                          />
                          {!(imageURL === "") ? (
                            <DocumentUploadComponent
                              changeFunc={() => {
                                const input = document.getElementById(
                                  "image_url"
                                ) as HTMLInputElement
                                input.click()
                              }}
                              previewFunc={() => {}}
                            />
                          ) : (
                            <Image
                              src={`/illustrations/upload.svg`}
                              alt=''
                              height={48}
                              width={48}
                            />
                          )}
                        </label>
                      </div>

                      <div className='  flex flex-col gap-4   '>
                        <h4
                          className={`font-label__large text-neutral-90 capitalize  `}
                        >
                          Utility Bill
                        </h4>
                        <label
                          className={`  relative w-full rounded-lg border border-neutral-90 py-[19px]  flex items-center justify-center ${
                            !(utilityURL === "") && "bg-neutral-20"
                          }  `}
                          htmlFor='utility_image_url'
                        >
                          <input
                            type='file'
                            name='utility_image_url'
                            id='utility_image_url'
                            className=' absolute w-full h-full opacity-0 cursor-default '
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setUtilityFile(
                                e.target.files ? e.target.files[0] : null
                              )
                            }
                          />
                          {!(utilityURL === "") ? (
                            <DocumentUploadComponent
                              changeFunc={() => {
                                const input = document.getElementById(
                                  "utility_image_url"
                                ) as HTMLInputElement
                                input.click()
                              }}
                              previewFunc={() => {}}
                            />
                          ) : (
                            <Image
                              src={`/illustrations/upload.svg`}
                              alt=''
                              height={48}
                              width={48}
                            />
                          )}
                        </label>
                      </div>

                      <BtnMain
                        btnText='Submit'
                        btnStyle=' w-full text-center text-grey  btn-gradient-loan'
                        type='submit'
                      />
                    </div>
                  )}
                </form>
              </FormProvider>
            </div>
          </div>
        </ContentWrap>
      </div>
    </>
  )
}
