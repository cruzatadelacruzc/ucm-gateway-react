import AppRouter from './routes';
import React, {useEffect, useContext} from 'react';
import {CssBaseline} from '@material-ui/core';
import {BrowserRouter} from 'react-router-dom';
import ErrorBoundary from './components/shared/error/error-boudary';
import './config/i18n';
import {AppContext} from './config/context';
import {getSession} from "./components/shared/reducer/authenticate";

export default function App() {
    const {dispatch} = useContext(AppContext);
    useEffect(() => {
        dispatch(getSession())
    }, []);

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
