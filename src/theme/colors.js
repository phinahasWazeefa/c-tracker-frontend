import { createTheme } from '@mui/material/styles';


// desktop theme
const desktopTheme = createTheme({
  palette: {
    primary: {
      main: '#146C94',
    },
    secondary:{
        main:'#19A7CE'
    },
    
    backgroundColor:{
        main:'#2B3467'
    },
    textColor:{
      main:'#FCFFE7'
    },
    paragraphColor:{
      main:'black'
    }
  },
});


// Mobile theme
const mobileTheme = createTheme({
  palette: {
    primary: {
      main: 'white',
    },
    secondary: {
      main: '#146C94',
    },
    backgroundColor:{
        main:'#A4907C'
    },
    textColor:{
      main:'#FF0303'
    },
    paragraphColor:{
      main:'#16FF00'
    }
  },
});

export  {darkTheme, mobileTheme, desktopTheme};
