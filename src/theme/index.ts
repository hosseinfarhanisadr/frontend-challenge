import { createTheme } from '@mui/material/styles';
import { darkScrollbar } from './scrollbar';

// Create a theme instance.
const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: darkScrollbar(),
      },
    },
  },
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
