import { userService } from "@/services"
import {
  AuthButton,
  BackBtnCircle,
  BtnMain,
  FormTitledContainer,
  IconPesaColored,
  IconScan,
  IconSearch,
  NextArrow,
  RegisterInput,
  SetupLayout,
  UserInterface,
} from "@/shared"
import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "../ui/use-toast"
import { useUser } from "@/hooks/user/useUser"
import { useRouter } from "next/navigation"

interface SearchInput {
  amount: string
}

export function ComponentThree() {
  const Router = useRouter()
  const methods = useForm<SearchInput>({
    defaultValues: {
      amount: "",
    },
  })

  const user = useUser() as UserInterface

  const onSubmit = async (data: SearchInput) => {
    if (data.amount.length === 0) return
  

    try {
      const res = await userService.searchWallets(data.amount)
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
      })
    }
  }

  return (
    <div>
      <SetupLayout bg='bg-profile-1'>
        <div className=' m-[72px] flex flex-col gap-[84px] '>
          <IconPesaColored />

          <div className=' flex flex-col gap-3 '>
            <div
              className=''
              // onClick={() => onNext()}
            >
              <BackBtnCircle />
              <button title='next' className=''>
                <NextArrow />
              </button>
            </div>

            <FormTitledContainer
              title='Send Money'
              subtitle='Enter Amount'
              utils={<Utils />}
            >
              {/* <input
            type='search'
            name=''
            id=''
            className=' form-input outline-none bg-transparent  w-full max-h-[3rem] placeholder:text-neutral-70 placeholder:font-body__large border-x-0 border-t-0 border-b-[1px] border-b-purple   '
            placeholder='Search with Username, Phone Number, or Email Address'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <BtnMain btnText='Next' btnStyle=' authBtn ' /> */}
              {/* {searchResult && (
                <h2 className='text-purple font-title__large   '>
                  {searchResult?.first_name} {searchResult?.last_name}
                </h2>
              )} */}

              <FormProvider {...methods}>
                <form
                  action=''
                  onSubmit={methods.handleSubmit(onSubmit)}
                  className=' flex flex-col gap-6 '
                >
                  <RegisterInput
                    name={`amount`}
                    inputPlaceholder={`Enter Amount`}
                    label='Amount'
                  />
                  <div className=' flex gap-12 '>
                    <BtnMain
                      btnText='Bank Transfer'
                      type='reset'
                      btnStyle=' border-purple border-[1px] min-w-[218px]  text-purple   '
                      onClick={() => {
                        // Router.push("/send/transfer")
                   
                      }}
                    />
                    <AuthButton
                      btnText='Wallet Transfer'
                      btnStyle=' min-w-[218px] '
                    />
                  </div>
                </form>
              </FormProvider>
            </FormTitledContainer>
          </div>
        </div>
      </SetupLayout>
    </div>
  )
}

function Utils() {
  return (
    <>
      <div className='flex gap-6  items-center  '>
        <IconSearch />
        <IconScan />
      </div>
    </>
  )
}
