import ReactDOM from 'react-dom';
import React from 'react'
import './index.css';
import App from './App';
import '@fontsource/roboto';
import reportWebVitals from './reportWebVitals';
import ErrorBoundary from './components/shared/error/error-boudary';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { blue, indigo, grey } from '@material-ui/core/colors';
import { AppProvider } from './config/context';

const theme = createMuiTheme({
  palette: {
    background: {
      default: grey['100'],
    },
    secondary: {
      main: blue[500],
    },
    primary: {
      main: indigo[500],
    },
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: ['"Lato"', 'sans-serif'].join(','),
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
      },
    },
    MuiTab: {
      root: {
        textTransform: 'none',
      },
    },
  },
});

ReactDOM.render(
  <ErrorBoundary>
    <ThemeProvider theme={theme}>
      <AppProvider>
        <App />
      </AppProvider>
    </ThemeProvider>
  </ErrorBoundary>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
