import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './components/app';
import { BrowserRouter } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
