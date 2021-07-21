import AppRouter from './routes';
import React, {useCallback, useEffect} from 'react';
import {CssBaseline} from '@material-ui/core';
import {BrowserRouter} from 'react-router-dom';
import ErrorBoundary from './components/shared/error/error-boudary';
import './config/i18n';
import {getSession} from "./components/shared/reducer/authenticate";
import {useDispatch} from "react-redux";

export default function App() {
    const dispatch = useDispatch();
    const fetchSession = useCallback(() => dispatch(getSession()), [dispatch]);
    useEffect(() => {
        fetchSession()
    }, [fetchSession]);

    return (
        <BrowserRouter>
            <CssBaseline/>
            <div style={{flexGrow: 1}}>
                <ErrorBoundary>
                    <AppRouter/>
                </ErrorBoundary>
            </div>
        </BrowserRouter>
    );
}
