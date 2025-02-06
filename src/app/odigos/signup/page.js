"use client"
import dynamic from 'next/dynamic';
import useResponsive from '../../../hook/useResponsive';

const SignupPageMobile = dynamic(() => import('../../../screen/Signup/SignupPageMobile'), {
  ssr: false, // Render this component only on the client side
});

import { useEffect, useState } from 'react'


export default function Page() {
  
  const {isMobile} = useResponsive();
  const [mobile, setmobile] = useState(true);
  useEffect(() => {
    setmobile(isMobile);
  }, [isMobile])
  
  return (
    <>  {mobile ? <SignupPageMobile/>:<><h1>Please open in mobile browser</h1></> }</>
  )
}

