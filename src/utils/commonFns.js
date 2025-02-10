import moment from 'moment-timezone';

export const  getUserTimeZone = ()=>{
    // Check if the browser supports the Intl.DateTimeFormat API
    if (typeof Intl === 'object' && typeof Intl.DateTimeFormat === 'function') {
      // Get the user's time zone from the browser
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return userTimeZone;
    } else {
      // Fallback: You can use a default time zone if the API is not supported
      // For example, you can use 'UTC' or 'America/New_York' as a fallback
      return 'UTC';
    }
  }

  export const getUserMonth = ()=>{
    const now = new Date();
  const options = { month: 'long' };
  const userMonth = now.toLocaleDateString(undefined, options);

  return userMonth;
  }

  export const convertToUserLocalTime = (date,timezone)=>{
// Convert UTC timestamp to the user's local time
    const localTime = moment(date).tz(timezone);
    return localTime.format('LLL');
  
  }

  export const getToken = ()=>{

    let tokenFromLS;
  if(typeof window !== 'undefined'){

     tokenFromLS = localStorage.getItem('tokenOs');

     return tokenFromLS;
  }

  }
  

  export const doDateValidation = (date1,date2)=>{
    if (date1 < date2) {
      return true
    } else {
      return false
    }
  }
  

  export const displyExpenseComparison = (today, yesterday) => {
    try {
      const difference = today - yesterday;
  
      if (difference > 0) {
        return <span>Your expense is {difference} rs higher than yesterday.</span>
      } else if (difference < 0) {
        return <span>Your expense is {Math.abs(difference)} rs lower than yesterday.</span>
      } else {
        return <span>Your expense is the same as yesterday.</span>
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };