import App from './App';
import React from 'react'
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {bindActionCreators} from "redux";
import configureStore from "./config/store";
import reportWebVitals from './reportWebVitals';
import setupAxiosInterceptors from "./config/api-config";
import ErrorBoundary from './components/shared/error/error-boudary';
import {clearAuthentication} from "./components/shared/reducer/authenticate";

const store = configureStore();
const action = bindActionCreators({ clearAuthentication }, store.dispatch);
setupAxiosInterceptors(() => action.clearAuthentication());

ReactDOM.render(
  <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
  </ErrorBoundary>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
