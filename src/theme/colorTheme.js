import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F3AA60',
    },
    secondary:{
        main:'#1D5B79'
    }
    // Other color customizations
  },
});

// Mobile theme
const mobileTheme = createTheme({
  palette: {
    primary: {
      main: '#7CA7F9',
    },
    secondary: {
      main: '#F55A4C',
    },
  },
});

export  {theme, mobileTheme};
