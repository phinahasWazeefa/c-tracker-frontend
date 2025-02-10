"use client";
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';


import { Grid, Stack } from '@mui/material';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
//components
import ExpenseDisplayComponent from '../../components/ExpenseDisplayComponent/ExpenseDisplayComponent';
import EntryDisplayCard from '../../components/Cards/EntryDisplayCard';
import FloatingButton from '../../components/Buttons/FloatingButton';
import AddExpenseFormComponent from '../../components/Dialog/AddExpenseFormComponent';

//helpers
import axios from '../../axios';
import { getToken, convertToUserLocalTime, displyExpenseComparison } from '../../utils/commonFns';
import Loader from '../../components/Loader/Loader';
import Snackbar from '../../components/Snackbar/Snackbar';



const scrollableGrid = {
  maxHeight: '60vh', // Adjust the max height to your preference
  overflowY: 'auto',
  padding: '10px'
};

function HomePage() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [snackbarState, setSnackbarState] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('Testing alerts');
  const [snackbarServity, setSnackbarServity] = useState('info');
  const [categories, setCategories] = useState([]);

  const [sessionId,setSessionId] = useState(null);
  const [sessionName,setSessionName] = useState(null)
  const [expenseArry, setExpenseArry] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [thisMonthTotal,setThisMonthTotal] = useState(0);
  const [previousDayTotal,setPreviousDayTotal] = useState(0);

  const [formState, setFormState] = useState(false);

  const changeSnackbarState = () => {
    setSnackbarState(false)
  }
  //let user = useSelector((state)=>state.user);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
  
      // 1. Fetch Session Info
      let sessionData;
      try {
        const sessionResponse = await axios.get('/user/get-my-session', {
          headers: { Authorization: getToken() },
          // Allow 200 and 409 as resolved responses.
          validateStatus: (status) => status === 200 || status === 409,
        });
  
        if (sessionResponse.status !== 200) {
          // Handle non-200 status (like 409) without throwing.
          console.warn("Session fetch did not return 200:", sessionResponse.status);
          setSessionId(null);
          setSessionName(null);
          setExpenseArry([]);
          setTotalAmount(0);
          setLoading(false);
          return; // Stop further execution if session call doesn't succeed.
        }
  
        sessionData = sessionResponse.data;
        setSessionId(sessionData.sessionId);
        setSessionName(sessionData.sessionName);
      } catch (error) {
        // This catch should now only catch network or unexpected errors.
        console.error("Session API error:", error);
        setSessionId(null);
        setSessionName(null);
        setExpenseArry([]);
        setTotalAmount(0);
        setSnackbarMessage(
          error.response?.data?.message || error.message || "Something went wrong while fetching session"
        );
        setSnackbarServity("error");
        setSnackbarState(true);
        setLoading(false);
        return;
      }
  
      // 2. Fetch expenses and items in parallel
      let expenseResponse, itemsResponse;
      try {
        // Each axios call gets its own validateStatus setting.
        [expenseResponse, itemsResponse] = await Promise.all([
          axios.get(`/user/get-session-expense?sessionId=${sessionData.sessionId}`, {
            headers: { Authorization: getToken() },
            validateStatus: (status) => status === 200 || status === 409,
          }),
          axios.get('/user/get-items', {
            headers: { Authorization: getToken() },
            validateStatus: (status) => status === 200 || status === 409,
          }),
        ]);
      } catch (error) {
        // This block should only be hit for network errors.
        console.error("Parallel API network error:", error);
      }
  
      // Process Session Expenses
      if (expenseResponse) {
        if (expenseResponse.status === 200) {
          setExpenseArry(expenseResponse.data.sessionDetails.items);
          setTotalAmount(expenseResponse.data.sessionDetails.totalSessionPrice);
          setThisMonthTotal(0);
          setPreviousDayTotal(0);
        } else {
          // Handle non-200 statuses like 409
          console.warn("Expense API returned status:", expenseResponse.status);
          setExpenseArry([]);
          setTotalAmount(0);
        }
      } else {
        // If expenseResponse is undefined due to network error
        setExpenseArry([]);
        setTotalAmount(0);
      }
  
      // Process Items/Categories
      if (itemsResponse) {
        if (itemsResponse.status === 200) {
          setCategories(itemsResponse.data.items);
        } else {
          // Handle non-200 statuses like 409
          console.warn("Items API returned status:", itemsResponse.status);
          setCategories([]);
        }
      } else {
        // If itemsResponse is undefined due to network error
        setCategories([]);
      }
  
      setLoading(false);
    };
  
    fetchData();
  }, []);
  
  
  
  


  const changeFormState = () => {
   
    setFormState(true)
  }

  const closeForm = () => {
    setFormState(false);
  }

  const addNewExpense = (data) => {
    
    data.sessionId = sessionId;
    if (data.itemId == null || data.quantity == null) {
      setSnackbarMessage("All fields are required");
      setSnackbarServity("error");
      setSnackbarState(true);
      return;
    }
    setLoading(true);
    axios.post('/user/add-expense', {sessionId:sessionId,itemId:data.itemId,quantity:data.quantity}, { headers: { Authorization: getToken() } }).then((response) => {


      setExpenseArry((prevArray) => [...prevArray,
         {
          date:new Date(),
          item:data.itemId,
          quantity:data.quantity,
          _id:new Date().toISOString(),
          name:data.itemName,
          price:Number(data.unitPrice)*Number(data.quantity)
        }
      ]);
      setTotalAmount(totalAmount+(Number(data.unitPrice)*Number(data.quantity)));
      setThisMonthTotal(thisMonthTotal+(Number(data.unitPrice)*Number(data.quantity)));
      setFormState(false);
      setSnackbarMessage(response.data.message || "");
      setSnackbarServity("success");
      setLoading(false);
      setSnackbarState(true);
    }).catch((err) => {
      console.error(err);
      setSnackbarMessage(err.response.data.message || "something went wrong");
      setSnackbarServity("error");
      setLoading(false);
      setSnackbarState(true);
    })
  }

  const addNewCategory = (data) => {
   
    setLoading(true);
    axios.post('/user/create-item', data, { headers: { Authorization: getToken() } }).then((response) => {
      setCategories((prevArray) => [...prevArray, response.data.item]);
      setSnackbarMessage("New category added");
      setSnackbarServity("success");
      setLoading(false);
      setSnackbarState(true);
    }).catch((error) => {
      setSnackbarMessage(error.response.data.message || error.message || "Something went wrong");
      setSnackbarServity("error");
      setLoading(false);
      setSnackbarState(true);

    });
  }

  const closeCreateSessonHandler = () => {
    if (sessionId) {
      const confirmClose = window.confirm("Are you sure you want to close this session?");
      if (confirmClose) {
        closeASession();
      }
    } else {
      const confirmCreate = window.confirm("Are you sure you want to create a new session?");
      if (confirmCreate) {
        createASession();
      }
    }
  };
  

  const createASession = ()=>{
    try {
      axios.post('/user/create-a-session',{},
         { headers: { Authorization: getToken() } }
        ).then((response) => {

        setSessionId(response.data.sessionId);
        setSessionName(response.data.sessionName)
        setSnackbarMessage(response.data.message || "");
        setSnackbarServity("success");
        setLoading(false);
        setSnackbarState(true);
      }).catch((err) => {
        console.error(err);
        setSnackbarMessage(err.response.data.message || "something went wrong");
        setSnackbarServity("error");
        setLoading(false);
        setSnackbarState(true);
      })
    } catch (error) {
      
    }
  }

  const closeASession = ()=>{
    try {
      axios.post('/user/close-a-session',{sessionId:sessionId}, { headers: { Authorization: getToken() } }).then((response) => {

        setSnackbarMessage(response.data.message || "");
        setSnackbarServity("success");
        setLoading(false);
        setSnackbarState(true);
        router.push('/odigos/dashboard/sessions')

        
        
      }).catch((err) => {
        console.error(err);
        setSnackbarMessage(err.response.data.message || "something went wrong");
        setSnackbarServity("error");
        setLoading(false);
        setSnackbarState(true);
      })
    } catch (error) {
      
    }
  }

  return (
    <>
      <Loader openState={loading} />
      <Snackbar message={snackbarMessage} openStatus={snackbarState} severity={snackbarServity} onCloseFunction={changeSnackbarState} />

      <Grid container>
        <FloatingButton buttonText = {sessionId ? "Close Session " :" Create Session"}   clickAction={closeCreateSessonHandler}  />
       {sessionId ?  <FloatingButton buttonText={"Add"} clickAction={changeFormState} bottom='120px' /> : null }
        <AddExpenseFormComponent openState={formState} changeOpenState={closeForm} categories={categories} addEntryActn={addNewExpense} addNewCategory={addNewCategory}  />
        <Grid item xs={12} sm={12} margin={"3px"}>
          <ExpenseDisplayComponent totalAmount={totalAmount} thisMonthTotal={thisMonthTotal} sessionName={sessionName} monthTotaal />
        </Grid>
        <Grid item xs={12} sm={12} display={"flex"} justifyContent={"flex-end"} pr={2}>
      {/* {displyExpenseComparison(totalAmount,previousDayTotal)} */}
        </Grid>
        <Grid item xs={12} sm={12} sx={{ background: '', marginTop: '2px !important' }}>
          <div style={scrollableGrid}>
            {expenseArry.length >0 ? <>
              {expenseArry.map((expense) => {
              return <EntryDisplayCard date={convertToUserLocalTime(expense.date,"Asia/Kolkata")}  item={expense.name} totalAmount={expense.price} quantity={expense.quantity} />
            })}
            </>:null}
           

          </div>

        </Grid>
      </Grid>
    </>
  )
}

export default HomePage