import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './css/index.css';
import 'font-awesome/css/font-awesome.min.css';

import App from './components/App';

// create root object
const root = ReactDOM.createRoot(document.getElementById('root'));

// render react application
root.render(
  // use react router
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
