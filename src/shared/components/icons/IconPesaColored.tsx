"use client"
import { useRouter } from "next/navigation"
import { FC, ReactElement } from "react"

export const IconPesaColored: FC = (): ReactElement => {
  const Router = useRouter()
  return (
    <div className='' onClick={() => Router.push(`/dashboard`)}>
      <svg
        width='149'
        height='26'
        viewBox='0 0 149 26'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M0 1.02282H6.83097C8.34084 1.02282 9.69851 1.27243 10.904 1.77167C12.1216 2.25872 13.0896 3.02584 13.808 4.07301C14.5265 5.12018 14.8857 6.48394 14.8857 8.16428C14.8857 9.83245 14.5265 11.2145 13.808 12.3103C13.0896 13.4062 12.1216 14.2281 10.904 14.7761C9.69851 15.3118 8.34084 15.5797 6.83097 15.5797H3.12325V25.1321H0V1.02282ZM3.12325 12.9679H5.97253C7.00752 12.9679 7.94511 12.8157 8.78528 12.5113C9.63763 12.2068 10.3134 11.7076 10.8126 11.0136C11.3241 10.3195 11.5798 9.38801 11.5798 8.21907C11.5798 7.03796 11.3241 6.11864 10.8126 5.46112C10.3134 4.79141 9.63763 4.32262 8.78528 4.05474C7.94511 3.77469 7.00752 3.63466 5.97253 3.63466H3.12325V12.9679Z'
          fill='#4B0082'
        />
        <path
          d='M19.268 18.2829C19.2802 19.1839 19.475 20.0058 19.8525 20.7486C20.23 21.4914 20.7901 22.0819 21.5328 22.5203C22.2878 22.9586 23.2132 23.1778 24.3091 23.1778C25.2345 23.1778 26.0198 23.0438 26.6652 22.776C27.3227 22.4959 27.8585 22.1671 28.2725 21.7897C28.6865 21.4 28.9848 21.053 29.1674 20.7486L30.7199 22.6664C30.3181 23.2508 29.825 23.7623 29.2405 24.2006C28.6682 24.639 27.9681 24.9738 27.1401 25.2052C26.3121 25.4487 25.3014 25.5705 24.1081 25.5705C22.5009 25.5705 21.1067 25.2295 19.9255 24.5476C18.7566 23.8536 17.8556 22.8977 17.2224 21.6801C16.5892 20.4503 16.2726 19.0439 16.2726 17.461C16.2726 15.9998 16.5709 14.6847 17.1676 13.5158C17.7642 12.3347 18.6288 11.4032 19.7612 10.7213C20.9057 10.0394 22.2817 9.69851 23.889 9.69851C25.3623 9.69851 26.6408 10.009 27.7245 10.63C28.8204 11.2388 29.6667 12.1033 30.2633 13.2236C30.8721 14.3438 31.1765 15.6832 31.1765 17.2418C31.1765 17.3392 31.1705 17.5158 31.1583 17.7715C31.1461 18.015 31.1339 18.1855 31.1218 18.2829H19.268ZM28.1446 15.8902C28.1324 15.391 27.9863 14.843 27.7063 14.2464C27.4384 13.6498 27 13.1383 26.3912 12.7122C25.7824 12.286 24.9605 12.0729 23.9255 12.0729C22.854 12.0729 21.9894 12.2799 21.3319 12.6939C20.6866 13.1079 20.2117 13.6132 19.9073 14.2099C19.6029 14.7943 19.4263 15.3544 19.3776 15.8902H28.1446Z'
          fill='#4B0082'
        />
        <path
          d='M40.3111 9.69851C41.0904 9.69851 41.8149 9.77765 42.4846 9.93595C43.1665 10.0942 43.751 10.283 44.238 10.5021C44.7373 10.7213 45.0904 10.9161 45.2974 11.0866L44.0371 13.0957C43.7936 12.8765 43.3552 12.633 42.7221 12.3651C42.0889 12.0851 41.3827 11.9451 40.6034 11.9451C39.751 11.9451 39.0265 12.1155 38.4299 12.4565C37.8332 12.7852 37.5349 13.2662 37.5349 13.8994C37.5349 14.5325 37.8393 15.0379 38.4481 15.4153C39.0691 15.7806 39.8971 16.085 40.9321 16.3286C41.7601 16.5234 42.5333 16.7852 43.2517 17.1139C43.9823 17.4427 44.5729 17.8993 45.0234 18.4838C45.4739 19.0561 45.6992 19.8232 45.6992 20.7851C45.6992 21.6618 45.5165 22.4107 45.1513 23.0317C44.786 23.6405 44.2928 24.1336 43.6718 24.5111C43.0508 24.8764 42.3568 25.1443 41.5897 25.3147C40.8225 25.4852 40.0433 25.5705 39.2518 25.5705C38.3264 25.5705 37.4923 25.473 36.7495 25.2782C36.0068 25.0956 35.3797 24.8764 34.8683 24.6207C34.369 24.3528 34.0038 24.1215 33.7724 23.9266L35.0327 21.6618C35.3493 21.9662 35.8667 22.2889 36.5852 22.6299C37.3157 22.9708 38.1437 23.1413 39.0691 23.1413C40.092 23.1413 40.92 22.9282 41.5531 22.502C42.1863 22.0636 42.5029 21.4974 42.5029 20.8034C42.5029 20.2798 42.3507 19.8597 42.0463 19.5431C41.7419 19.2265 41.334 18.9708 40.8225 18.776C40.3111 18.5812 39.751 18.4107 39.1422 18.2646C38.5577 18.1307 37.9854 17.9541 37.4253 17.7349C36.8774 17.5158 36.3721 17.2357 35.9094 16.8948C35.4588 16.5416 35.0996 16.1155 34.8318 15.6162C34.5639 15.1048 34.4299 14.5082 34.4299 13.8263C34.4299 12.9618 34.7039 12.2251 35.2518 11.6163C35.7998 10.9953 36.5182 10.5204 37.4071 10.1917C38.2959 9.86289 39.264 9.69851 40.3111 9.69851Z'
          fill='#4B0082'
        />
        <path
          d='M61.4376 25.1321V22.2098C61.3402 22.5142 61.054 22.9343 60.5791 23.47C60.1164 24.0058 59.4772 24.4928 58.6614 24.9312C57.8577 25.3574 56.908 25.5705 55.8121 25.5705C54.424 25.5705 53.1637 25.2417 52.0313 24.5842C50.9111 23.9266 50.0161 23.0073 49.3464 21.8262C48.6889 20.6329 48.3601 19.2387 48.3601 17.6436C48.3601 16.0485 48.6889 14.6604 49.3464 13.4793C50.0161 12.286 50.9111 11.3606 52.0313 10.7031C53.1637 10.0334 54.424 9.69851 55.8121 9.69851C56.8958 9.69851 57.8334 9.89333 58.6248 10.283C59.4285 10.6726 60.0677 11.1231 60.5426 11.6346C61.0297 12.146 61.3158 12.5843 61.4011 12.9496V10.1369H64.5426V25.1321H61.4376ZM51.5016 17.6436C51.5016 18.7273 51.7391 19.6649 52.214 20.4564C52.6888 21.2478 53.3037 21.8627 54.0587 22.3011C54.8258 22.7273 55.6416 22.9403 56.5061 22.9403C57.4315 22.9403 58.2595 22.7212 58.9901 22.2828C59.7207 21.8445 60.2991 21.2296 60.7253 20.4381C61.1514 19.6345 61.3645 18.703 61.3645 17.6436C61.3645 16.5843 61.1514 15.6589 60.7253 14.8674C60.2991 14.0637 59.7207 13.4428 58.9901 13.0044C58.2595 12.5539 57.4315 12.3286 56.5061 12.3286C55.6416 12.3286 54.8258 12.5478 54.0587 12.9861C53.3037 13.4245 52.6888 14.0394 52.214 14.8309C51.7391 15.6223 51.5016 16.5599 51.5016 17.6436Z'
          fill='#4B0082'
        />
        <path
          d='M76.3872 0.584467C77.7753 0.584467 78.9686 0.74276 79.967 1.05935C80.9777 1.37593 81.7691 1.71079 82.3414 2.0639C82.9259 2.41702 83.2729 2.64837 83.3825 2.75796L81.7752 5.33326C81.5926 5.17497 81.2699 4.94971 80.8072 4.65747C80.3445 4.35307 79.7661 4.08518 79.0721 3.85383C78.378 3.6103 77.5865 3.48854 76.6977 3.48854C75.3217 3.48854 74.2319 3.7686 73.4283 4.32871C72.6368 4.87665 72.2411 5.65594 72.2411 6.66658C72.2411 7.34846 72.4481 7.95119 72.8621 8.47478C73.2883 8.98619 73.8849 9.45498 74.652 9.88115C75.4191 10.3073 76.3141 10.7457 77.3369 11.1962C78.1771 11.5493 78.999 11.9511 79.8027 12.4017C80.6185 12.8522 81.3551 13.3819 82.0127 13.9907C82.6824 14.5995 83.212 15.3057 83.6017 16.1094C84.0035 16.913 84.2044 17.8384 84.2044 18.8856C84.2044 19.9206 83.9913 20.8521 83.5652 21.6801C83.1512 22.5081 82.5606 23.2143 81.7935 23.7988C81.0386 24.3711 80.1558 24.8094 79.1451 25.1138C78.1345 25.4182 77.0447 25.5705 75.8758 25.5705C74.4024 25.5705 73.0691 25.3878 71.8758 25.0225C70.6947 24.6572 69.7388 24.2737 69.0083 23.8718C68.2899 23.47 67.8759 23.2204 67.7663 23.123L69.4649 20.4381C69.611 20.5599 69.8789 20.7425 70.2685 20.986C70.6582 21.2174 71.1391 21.4609 71.7114 21.7166C72.2837 21.9723 72.9291 22.1915 73.6475 22.3741C74.3659 22.5446 75.133 22.6299 75.9488 22.6299C77.5805 22.6299 78.8164 22.2646 79.6565 21.534C80.4967 20.8034 80.9168 19.8658 80.9168 18.7212C80.9168 17.8445 80.6489 17.0896 80.1131 16.4564C79.5774 15.8232 78.8651 15.257 77.9762 14.7578C77.0873 14.2586 76.1071 13.7776 75.0356 13.3149C73.9397 12.8157 72.9352 12.2677 72.0219 11.6711C71.1087 11.0744 70.372 10.3621 69.8119 9.53413C69.264 8.69395 68.99 7.68331 68.99 6.5022C68.99 5.33327 69.3188 4.30436 69.9763 3.41548C70.646 2.5266 71.541 1.83255 72.6612 1.33332C73.7936 0.834083 75.0356 0.584467 76.3872 0.584467Z'
          fill='#FFC857'
        />
        <path
          d='M86.8097 10.1369H89.7503V3.98168H92.9101V10.1369H96.7639V12.8583H92.9101V20.2737C92.9101 21.1504 93.0623 21.7958 93.3667 22.2098C93.6833 22.6238 94.1034 22.8308 94.6269 22.8308C95.0897 22.8308 95.4489 22.7455 95.7046 22.5751C95.9603 22.4046 96.1125 22.2889 96.1612 22.228L97.4214 24.5659C97.3484 24.6268 97.1536 24.7425 96.837 24.9129C96.5204 25.0834 96.1125 25.2356 95.6132 25.3695C95.114 25.5035 94.5295 25.5705 93.8598 25.5705C92.6909 25.5705 91.7107 25.2173 90.9192 24.5111C90.1399 23.7927 89.7503 22.6603 89.7503 21.1139V12.8583H86.8097V10.1369Z'
          fill='#4B0082'
        />
        <path
          d='M112.236 25.1321V22.2098C112.139 22.5142 111.852 22.9343 111.378 23.47C110.915 24.0058 110.276 24.4928 109.46 24.9312C108.656 25.3574 107.706 25.5705 106.611 25.5705C105.222 25.5705 103.962 25.2417 102.83 24.5842C101.71 23.9266 100.815 23.0073 100.145 21.8262C99.4873 20.6329 99.1586 19.2387 99.1586 17.6436C99.1586 16.0485 99.4873 14.6604 100.145 13.4793C100.815 12.286 101.71 11.3606 102.83 10.7031C103.962 10.0334 105.222 9.69851 106.611 9.69851C107.694 9.69851 108.632 9.89333 109.423 10.283C110.227 10.6726 110.866 11.1231 111.341 11.6346C111.828 12.146 112.114 12.5843 112.2 12.9496V10.1369H115.341V25.1321H112.236ZM102.3 17.6436C102.3 18.7273 102.538 19.6649 103.012 20.4564C103.487 21.2478 104.102 21.8627 104.857 22.3011C105.624 22.7273 106.44 22.9403 107.305 22.9403C108.23 22.9403 109.058 22.7212 109.789 22.2828C110.519 21.8445 111.098 21.2296 111.524 20.4381C111.95 19.6345 112.163 18.703 112.163 17.6436C112.163 16.5843 111.95 15.6589 111.524 14.8674C111.098 14.0637 110.519 13.4428 109.789 13.0044C109.058 12.5539 108.23 12.3286 107.305 12.3286C106.44 12.3286 105.624 12.5478 104.857 12.9861C104.102 13.4245 103.487 14.0394 103.012 14.8309C102.538 15.6223 102.3 16.5599 102.3 17.6436Z'
          fill='#4B0082'
        />
        <path
          d='M125.213 9.69851C125.992 9.69851 126.717 9.77765 127.387 9.93595C128.068 10.0942 128.653 10.283 129.14 10.5021C129.639 10.7213 129.992 10.9161 130.199 11.0866L128.939 13.0957C128.695 12.8765 128.257 12.633 127.624 12.3651C126.991 12.0851 126.285 11.9451 125.505 11.9451C124.653 11.9451 123.928 12.1155 123.332 12.4565C122.735 12.7852 122.437 13.2662 122.437 13.8994C122.437 14.5325 122.741 15.0379 123.35 15.4153C123.971 15.7806 124.799 16.085 125.834 16.3286C126.662 16.5234 127.435 16.7852 128.154 17.1139C128.884 17.4427 129.475 17.8993 129.925 18.4838C130.376 19.0561 130.601 19.8232 130.601 20.7851C130.601 21.6618 130.418 22.4107 130.053 23.0317C129.688 23.6405 129.195 24.1336 128.574 24.5111C127.953 24.8764 127.259 25.1443 126.492 25.3147C125.724 25.4852 124.945 25.5705 124.154 25.5705C123.228 25.5705 122.394 25.473 121.651 25.2782C120.909 25.0956 120.282 24.8764 119.77 24.6207C119.271 24.3528 118.906 24.1215 118.674 23.9266L119.935 21.6618C120.251 21.9662 120.769 22.2889 121.487 22.6299C122.218 22.9708 123.046 23.1413 123.971 23.1413C124.994 23.1413 125.822 22.9282 126.455 22.502C127.088 22.0636 127.405 21.4974 127.405 20.8034C127.405 20.2798 127.253 19.8597 126.948 19.5431C126.644 19.2265 126.236 18.9708 125.724 18.776C125.213 18.5812 124.653 18.4107 124.044 18.2646C123.46 18.1307 122.887 17.9541 122.327 17.7349C121.779 17.5158 121.274 17.2357 120.811 16.8948C120.361 16.5416 120.002 16.1155 119.734 15.6162C119.466 15.1048 119.332 14.5082 119.332 13.8263C119.332 12.9618 119.606 12.2251 120.154 11.6163C120.702 10.9953 121.42 10.5204 122.309 10.1917C123.198 9.86289 124.166 9.69851 125.213 9.69851Z'
          fill='#4B0082'
        />
        <path
          d='M142.778 9.69851C143.764 9.69851 144.72 9.90551 145.645 10.3195C146.583 10.7335 147.35 11.391 147.947 12.2921C148.556 13.181 148.86 14.3438 148.86 15.7806V25.1321H145.645V16.4016C145.645 14.9161 145.304 13.8385 144.623 13.1688C143.953 12.4869 143.07 12.146 141.974 12.146C141.244 12.146 140.544 12.353 139.874 12.767C139.204 13.1688 138.65 13.7289 138.212 14.4473C137.786 15.1535 137.572 15.9572 137.572 16.8582V25.1321H134.358V0H137.572V12.8035C137.682 12.3895 137.974 11.939 138.449 11.4519C138.936 10.9649 139.557 10.5509 140.312 10.2099C141.067 9.86898 141.889 9.69851 142.778 9.69851Z'
          fill='#4B0082'
        />
      </svg>
    </div>
  )
}
