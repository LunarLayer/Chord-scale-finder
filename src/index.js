import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './basics/reset.css';
import './basics/fonts.css';
import './basics/basics.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <App />
  /* </React.StrictMode> */
);
