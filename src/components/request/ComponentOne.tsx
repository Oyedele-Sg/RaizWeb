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
  UserSearchInterface,
} from "@/shared"
import React, { useEffect, useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { useForm, FormProvider } from "react-hook-form"
import { useAppDispatch } from "@/shared/redux/types"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import { useRouter } from "next/navigation"

interface Prop {
  //   searchQuery: string
  setSearchResults: React.Dispatch<
    React.SetStateAction<UserSearchInterface | undefined>
  >
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  //   searchResult: UserSearchInterface
}

interface SearchInput {
  query: string
}

export function ComponentOne({ setSearchResults, setCurrentStep }: Prop) {
  const Router = useRouter()
  const methods = useForm<SearchInput>({
    defaultValues: {
      query: "",
    },
  })

  const dispatch = useAppDispatch()

  const onSubmit = async (data: SearchInput) => {
    if (data.query.length === 0) return

    try {
      dispatch(setLoadingTrue())
      const res = await userService.searchWallets(data.query)
      // setSearchResults(res)
      dispatch(setLoadingFalse())
      setCurrentStep(2)
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
      })
    }
  }

  return (
    <div>
      <SetupLayout bg='bg-profile-1'>
        <div className=' m-[72px] flex flex-col gap-[84px] '>
          <IconPesaColored />

          <div className=' flex flex-col gap-3 '>
            <div className='' onClick={() => Router.back}>
              <BackBtnCircle />
              <button title='next' className=''>
                <NextArrow />
              </button>
            </div>

            <FormTitledContainer
              title='Request'
              subtitle='Find User(s)'
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

              <FormProvider {...methods}>
                <form
                  action=''
                  onSubmit={methods.handleSubmit(onSubmit)}
                  className=' flex flex-col gap-6 '
                >
                  <RegisterInput
                    name={`query`}
                    inputPlaceholder={`Search with User's Username, Phone Number, or Email Address`}
                  />
                  <AuthButton btnText='Next' />
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
