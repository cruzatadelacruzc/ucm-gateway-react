import './config/i18n';
import AppRouter from './routes';
import _theme from "./theme";
import {useDispatch} from "react-redux";
import {SnackbarProvider} from "notistack";
import {CssBaseline} from '@mui/material';
import {BrowserRouter} from 'react-router-dom';
import React, {useEffect} from 'react';
import {StyledEngineProvider, Theme, ThemeProvider} from "@mui/material/styles";
import ErrorBoundary from './components/shared/error/error-boudary';
import {getSession} from "./components/shared/reducer/authenticate";
import {SnackbarUtilsConfigurator} from "./components/shared/util/notification-snackbar.util";
import "react-perfect-scrollbar/dist/css/styles.css";


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


export default function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSession())
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <BrowserRouter>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={_theme()}>
                    <SnackbarProvider preventDuplicate={true} autoHideDuration={8000}
                                      anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                    >
                        <SnackbarUtilsConfigurator/>
                        <CssBaseline/>
                        <ErrorBoundary>
                            <AppRouter/>
                        </ErrorBoundary>
                    </SnackbarProvider>
                </ThemeProvider>
            </StyledEngineProvider>
        </BrowserRouter>
    );
}
