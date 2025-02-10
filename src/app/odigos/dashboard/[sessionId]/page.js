import SessionBillPage from "../../../../screen/Sessions/SessionBillPage";




export default function SessionPage({ params }) {
  const { sessionId } = params;
  return <SessionBillPage sessionId = {sessionId} />;
}
