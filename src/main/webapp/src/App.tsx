import './config/i18n';
import AppRouter from './routes';
import defaultTheme from "./theme";
import {useDispatch} from "react-redux";
import {SnackbarProvider} from "notistack";
import {CssBaseline} from '@material-ui/core';
import {BrowserRouter} from 'react-router-dom';
import React, {useEffect} from 'react';
import {ThemeProvider} from "@material-ui/core/styles";
import ErrorBoundary from './components/shared/error/error-boudary';
import {getSession} from "./components/shared/reducer/authenticate";
import {SnackbarUtilsConfigurator} from "./components/shared/util/notification-snackbar.util";

export default function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSession())
    }, [dispatch]);

    return (
        <BrowserRouter>
            <ThemeProvider theme={defaultTheme}>
                <SnackbarProvider preventDuplicate={true} autoHideDuration={8000}
                                  anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                >
                    <SnackbarUtilsConfigurator/>
                    <CssBaseline/>
                    <div style={{flexGrow: 1}}>
                        <ErrorBoundary>
                            <AppRouter/>
                        </ErrorBoundary>
                    </div>
                </SnackbarProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
}
