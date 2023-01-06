import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

// create root object
const root = ReactDOM.createRoot(document.getElementById('root'));

// render react application
root.render(
  // use react router
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
