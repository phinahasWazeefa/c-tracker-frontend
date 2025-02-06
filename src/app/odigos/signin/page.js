"use client"
import dynamic from 'next/dynamic';
import useResponsive from '../../../hook/useResponsive'

const SigninPageMobile = dynamic(() => import('../../../screen/Signin/SigninPageMobile'), {
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
    <>  {mobile ? <SigninPageMobile/>:<><h1>Please open in mobile browser</h1></> }</>
  )
}

