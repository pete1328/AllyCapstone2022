import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {
    primary: {
        main: '#000000',
    },
    secondary: {
        main: '#FFFFFF'
    },
    gray: {
        main:'#7E7E7E',
        contrastText: '#FFFFFF',
    },
  },
});