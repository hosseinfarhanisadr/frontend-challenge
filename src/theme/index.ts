import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#1775b9',
      light: '#a2ceed',
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
});

export default theme;
