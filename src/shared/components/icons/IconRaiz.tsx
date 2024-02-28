import { useRouter } from "next/navigation"
import { FC, ReactElement } from "react"

export const IconRaiz: FC = (): ReactElement => {
  const Router = useRouter()

  return (
    <div className='' onClick={() => Router.push("/dashboard")}>
      <svg
        width='101'
        height='26'
        viewBox='0 0 101 26'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect
          width='8.57984'
          height='25.7395'
          transform='translate(0.183594 0.0043335)'
          fill='#F4F4F4'
        />
        <path
          d='M17.3438 17.1642H24.2076C25.1553 17.1642 25.9236 17.9325 25.9236 18.8802V24.0281C25.9236 24.9758 25.1553 25.744 24.2076 25.744H19.0597C18.112 25.744 17.3438 24.9758 17.3438 24.0281V17.1642Z'
          fill='#FFC857'
        />
        <g clipPath='url(#clip0_3806_13993)'>
          <rect
            width='8.57984'
            height='25.7395'
            transform='translate(25.9219 0.0043335) rotate(90)'
            fill='#F4F4F4'
            fill-opacity='0.7'
          />
          <rect
            width='8.57984'
            height='17.1597'
            transform='translate(17.3438 0.0043335) rotate(90)'
            fill='#F4F4F4'
          />
        </g>
        <rect
          width='8.57985'
          height='17.1597'
          transform='translate(17.3438 17.1642) rotate(-180)'
          fill='#F4F4F4'
          fill-opacity='0.7'
        />
        <path
          d='M37.9219 0.209027H46.682C48.0375 0.209027 49.2663 0.494064 50.3685 1.06414C51.4833 1.62154 52.3701 2.44498 53.0288 3.53445C53.7002 4.61126 54.0359 5.92876 54.0359 7.48696C54.0359 9.03249 53.7256 10.312 53.1048 11.3255C52.4967 12.3389 51.762 13.1053 50.9005 13.6247C50.0391 14.1315 49.241 14.4102 48.5062 14.4609L54.72 25.2922H51.0336L45.2188 14.6889H41.1713V25.2922H37.9219V0.209027ZM41.1713 12.2756H45.5419C47.0367 12.2756 48.2719 11.9019 49.2473 11.1544C50.2228 10.407 50.7105 9.20985 50.7105 7.56297C50.7105 5.91609 50.2228 4.73161 49.2473 4.00951C48.2845 3.28742 47.0557 2.92638 45.5609 2.92638H41.1713V12.2756Z'
          fill='#F4F4F4'
        />
        <path
          d='M71.4493 25.2922V22.2519C71.3479 22.5686 71.0502 23.0056 70.5562 23.563C70.0748 24.1204 69.4097 24.6272 68.5609 25.0832C67.7248 25.5266 66.7367 25.7483 65.5965 25.7483C64.1524 25.7483 62.8412 25.4063 61.663 24.7222C60.4976 24.0381 59.5664 23.0816 58.8697 21.8528C58.1856 20.6113 57.8435 19.1608 57.8435 17.5012C57.8435 15.8417 58.1856 14.3975 58.8697 13.1687C59.5664 11.9272 60.4976 10.9644 61.663 10.2803C62.8412 9.58356 64.1524 9.23518 65.5965 9.23518C66.724 9.23518 67.6995 9.43788 68.5229 9.84326C69.359 10.2486 70.0241 10.7174 70.5182 11.2494C71.0249 11.7815 71.3226 12.2376 71.4113 12.6176V9.69124H74.6797V25.2922H71.4493ZM61.112 17.5012C61.112 18.6287 61.359 19.6042 61.8531 20.4276C62.3471 21.2511 62.9869 21.8908 63.7723 22.3469C64.5704 22.7903 65.4192 23.0119 66.3186 23.0119C67.2814 23.0119 68.1429 22.7839 68.903 22.3279C69.6631 21.8718 70.2648 21.2321 70.7082 20.4086C71.1516 19.5725 71.3733 18.6034 71.3733 17.5012C71.3733 16.3991 71.1516 15.4363 70.7082 14.6129C70.2648 13.7768 69.6631 13.1307 68.903 12.6746C68.1429 12.2059 67.2814 11.9715 66.3186 11.9715C65.4192 11.9715 64.5704 12.1996 63.7723 12.6556C62.9869 13.1117 62.3471 13.7514 61.8531 14.5749C61.359 15.3983 61.112 16.3738 61.112 17.5012Z'
          fill='#F4F4F4'
        />
        <path
          d='M79.4588 25.2922V9.69124H82.7652V25.2922H79.4588ZM81.15 4.35156C80.5546 4.35156 80.0416 4.14253 79.6108 3.72448C79.1928 3.29376 78.9838 2.78069 78.9838 2.18528C78.9838 1.58987 79.1928 1.07681 79.6108 0.646083C80.0416 0.215361 80.5546 0 81.15 0C81.5428 0 81.9038 0.101347 82.2332 0.30404C82.5752 0.506733 82.8476 0.772767 83.0503 1.10214C83.253 1.41885 83.3543 1.7799 83.3543 2.18528C83.3543 2.78069 83.139 3.29376 82.7082 3.72448C82.2775 4.14253 81.7581 4.35156 81.15 4.35156Z'
          fill='#F4F4F4'
        />
        <path
          d='M87.2115 9.69124H100.817L91.4871 22.7839H100.437V25.2922H86.1474L95.4776 12.1806H87.2115V9.69124Z'
          fill='#F4F4F4'
        />
        <defs>
          <clipPath id='clip0_3806_13993'>
            <rect
              width='8.57984'
              height='25.7395'
              fill='white'
              transform='translate(25.9219 0.0043335) rotate(90)'
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}
