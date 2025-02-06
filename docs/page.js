"use client"

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

//components
import Loader from '../components/Loader/Loader';

//helpers
import {getToken,getUserTimeZone} from '../utils/commonFns';
import { addUser, setLoginState } from '../Redux/UserSlice';
import axios from '../axios';

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  let tokenFromLS = getToken();
  

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    async function fetchData() {
      try {
        setIsLoading(true)

        const response = await axios.get(`/user/get-user?timezone=${getUserTimeZone()}`,{headers:{Authorization:tokenFromLS}});
     
        dispatch(setLoginState(true));
        dispatch(addUser(response.data.user));
        router.push('/odigos/dashboard/home');
        setIsLoading(false);

      } catch (error) {
        console.log(error.response);
        setIsLoading(false)
        router.push('/odigos/signin');
        return;
      }
    }

    if (tokenFromLS) {
      fetchData();
    } else {
      router.push('/odigos/signin');
      return;
    }
  }, [dispatch, router, tokenFromLS]);

  return (
<>
{isLoading ? <Loader openState={isLoading}/>:<Loader openState={isLoading}/>}
</>
      
  );
}
