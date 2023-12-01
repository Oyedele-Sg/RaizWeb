import { IllustrationComponent, LoginForm } from '@/components';
import React from 'react';

export default function Login() {
  return (
    <div className="   ">
      <div className=" fixed inset-0  lg:flex lg:items-center     h-screen ">
        <section className=" hidden lg:flex items-center justify-center  lg:flex-1 lg:basis-[554.1px]  ">
          <IllustrationComponent
            illustrationName="login"
            width={554.1}
            height={400}
          />
        </section>
        <section className="lg:flex-1  lg:basis-[636px]  h-full ">
          <div className=" bg-grey flex items-center justify-center  h-full ">
            <div className="flex flex-col gap-12 w-full mx-[1.94rem] ">
              <h1 className="  text-purple font-headline__large  ">
                Welcome Back
              </h1>
              <LoginForm />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

{
  /* <section className='flex-1  basis-[636px]'>
          <div className=' bg-grey  flex items-center justify-center h-full w-full lg:rounded-r-12 lg:mx-[60px] lg:max-h-[48.5rem] '>
            <div className='flex flex-col gap-12 '>
              <h1 className='  text-purple font-headline__large  '>
                Welcome Back
              </h1>
              <LoginForm />
            </div>
          </div>
        </section> */
}
