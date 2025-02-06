
import SessionBillPage from "../../../../screen/Sessions/SessionBillPage";
import axios from "../../../../axios";
import { getToken } from "../../../../utils/commonFns";

async function fetchSessionData(sessionId) {



  try {
    const tokenFromLS = getToken();
   console.log(tokenFromLS)
    const response = await axios.get(
      `/user/get-a-session-bill?sessionLogId=${sessionId}`,
      { headers: { Authorization:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjdhMWM5NGI0NzIzMDNhZmVhNDgwZDg2IiwiaWF0IjoxNzM4ODE4MDE3LCJleHAiOjE3Mzk0MjI4MTd9.OiDeeCgIwS0P1nHhsMK1EmGkNwcrp5m970WBJkRGCSQ' } }
    );
    return { sessionData: response.data, error: null };
  } catch (err) {
    console.error(err);
    return {
      sessionData: null,
      error: err.response?.data?.message || err.message || "Something went wrong",
    };
  }
}

export default async function SessionPage({ params }) {
  const { sessionId } = params;
  const { sessionData, error } = await fetchSessionData(sessionId);

  return <SessionBillPage sessionData={sessionData} error={error} />;
}
