"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

//components
import Loader from "../../../components/Loader/Loader";

//helpers
import { getToken, getUserTimeZone } from "../../../utils/commonFns";
import { addUser, setLoginState } from "../../../Redux/UserSlice";
import axios from "../../../axios";

import BottomNavigation from "../../../components/Navigations/BottomNavigation";

 const metadata = {
  title: "Odigos",
  description: "Odigos track your expense",
};

export default function RootLayout({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  let tokenFromLS = getToken();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const response = await axios.get(
          `/auth/get-user?timezone=${getUserTimeZone()}`,
          { headers: { Authorization: tokenFromLS } }
        );

        dispatch(setLoginState(true));
        dispatch(addUser(response.data.user));
        
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
        setIsLoading(false);
        router.push("/odigos/signin");
      }
    }

    if (tokenFromLS) {
      fetchData();
    } else {
      router.push("/odigos/signin");
    }
  }, [dispatch, router, tokenFromLS]);
  return (
    <>{isLoading ? <Loader openState={isLoading} /> : <BottomNavigation children={children} />}</>
  );
}
