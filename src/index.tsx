import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import firebase from 'firebase/app';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CONFIG_FIREBASE from './environment';
import './index.css';

if (!firebase.apps.length) {
  firebase.initializeApp(CONFIG_FIREBASE);
}

ReactDOM.render(
  <BrowserRouter>
    <Route component={App} />
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
