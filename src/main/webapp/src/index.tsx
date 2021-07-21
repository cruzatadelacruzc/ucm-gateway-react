import ReactDOM from 'react-dom';
import React from 'react'
import './index.css';
import App from './App';
import '@fontsource/roboto';
import reportWebVitals from './reportWebVitals';
import ErrorBoundary from './components/shared/error/error-boudary';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { blue, indigo, grey } from '@material-ui/core/colors';
import { Provider } from 'react-redux'
import configureStore from "./config/store";
import {bindActionCreators} from "redux";
import {clearAuthentication} from "./components/shared/reducer/authenticate";
import setupAxiosInterceptors from "./config/api-config";
import { SnackbarProvider } from "notistack"
import {SnackbarUtilsConfigurator} from "./components/shared/notification-snackbar.util";

const store = configureStore();
const action = bindActionCreators({ clearAuthentication }, store.dispatch);
setupAxiosInterceptors(() => action.clearAuthentication('login.error.unauthorized'));

const theme = createTheme({
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
      <Provider store={store}>
        <SnackbarProvider maxSnack={3}
                          preventDuplicate={true}
                          autoHideDuration={6000}
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}
        >
          <SnackbarUtilsConfigurator />
        <App />
        </SnackbarProvider>
      </Provider>
    </ThemeProvider>
  </ErrorBoundary>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
