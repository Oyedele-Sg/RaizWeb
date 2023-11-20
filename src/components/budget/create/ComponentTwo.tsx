"use client"
import { FormProvider, useForm, SubmitHandler, useWatch } from "react-hook-form"
import { AuthButton, Loading, RegisterInput } from "@/shared"
import { useCategory } from "@/hooks/category/useCategory"
import { userService } from "@/services"
import { useAppDispatch } from "@/shared/redux/types"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import { toast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
import { Router } from "next/router"
import { useRouter } from "next/navigation"

interface Category {
  category_id: number
  category_name: string
  category_code: number
  created_at: string
  updated_at: string
}

interface Props {
  currentMonth: {
    month_number: number
    month_name: string
  }
}

interface FormValues {
  [key: string]: number 
}

export function ComponentTwo({ currentMonth }: Props) {
  const methods = useForm<FormValues>({
    defaultValues: {},
  })
  const watchedValues = useWatch({
    control: methods.control,
  })

  const dispatch = useAppDispatch()

  const [total, setTotal] = useState<number>(0)
  
  const [budgeAmounts, setBudgetAmounts] = useState<
    {
      category_id: number
      budget_amount: number
    }[]
  >()
  const Router = useRouter()

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {

      const formData = {
        budget_name: "",
        total_budget: totalAmount as number,
        budget_month: currentMonth.month_number,
        budget_categories: budgeAmounts,
      }

      dispatch(setLoadingTrue())
      await userService.createBudget(formData)
      Router.push("/budget/success")
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

  const categories = useCategory()

  
  const totalAmount = Object.values(watchedValues).reduce(
    // @ts-ignore
    (acc, currentValue) => (acc as number) + parseFloat(currentValue) || 0,
    0
  )

  useEffect(() => {
    setTotal(totalAmount as number)

    const budgetCategories = categories?.map((category) => {
      const key = `category_${category.category_id}`
      return {
        category_id: category.category_id,
        // @ts-ignore
        budget_amount: parseFloat(watchedValues[key] as string) || 0,
      }
    })

    
    // @ts-ignore
    const othersAmount = parseFloat(watchedValues["others"] as string) || 0
    if (othersAmount > 0) {
      budgetCategories?.push({
        // @ts-ignore
        category_id: null,
        budget_amount: othersAmount,
      })
    }

    setBudgetAmounts(budgetCategories)
  }, [watchedValues])

  return (
    <>
      <Loading />
      <div className=' flex flex-col gap-9 '>
        <div className=' flex flex-col gap-1 '>
          <h2 className=' font-display__medium text-purple font-semi-mid '>
            {" "}
            Create Budget{" "}
          </h2>
          <p className=' text-neutral-70  font-title__large '>
            {currentMonth.month_name}
          </p>
        </div>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className=' flex flex-col gap-9 '
          >
            <div className='  flex flex-col gap-8  '>
              {categories?.map((category) => (
                <div key={category.category_id} className='flex flex-col gap-3'>
                  <RegisterInput
                    name={`category_${category.category_id}`}
                    inputPlaceholder={`Enter amount for ${category.category_name}`}
                    label={`${category.category_name}`}
                    type='number'
                    rules={{ required: true }}
                  />
                </div>
              ))}
              <RegisterInput
                name={`others`}
                inputPlaceholder={`Enter amount for Others`}
                label={`Others`}
                type='number'
                rules={{ required: true }}
              />
            </div>

            <div className=' flex justify-between   '>
              <span className=' text-neutral-90 text-t-22  '> Total: </span>
              <span className=' font-semi-mid font-headline__medium text-purple '>
                ₦{totalAmount}{" "}
              </span>
            </div>

            <AuthButton btnText='Proceed' btnStyle='w-full' />
          </form>
        </FormProvider>
      </div>
    </>
  )
}
