"use client"
import { ContentWrap } from "@/components/budget"
import { CreateBudgetInterface, RegisterInput } from "@/shared"
import { useForm, FormProvider } from "react-hook-form"

export default function page() {
  const methods = useForm<CreateBudgetInterface>({
    defaultValues: {
      budget_name: "",
      total_budget: 0,
      budget_month: 0,
    },
    // resolver: yupResolver(loginSchema),
  })

  return (
    <div className=''>
      <ContentWrap>
        <FormProvider {...methods}>
          <RegisterInput
            name={`budget_name`}
            inputPlaceholder={`Enter Email Address`}
            extraClass={`mt-6`}
            label='Email Address'
          />
        </FormProvider>
      </ContentWrap>
    </div>
  )
}
