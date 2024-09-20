import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import CustomerProvider from './project/CustomerProvider'

ReactDOM.render(
  <React.StrictMode>
    <CustomerProvider>
      <App/>
    </CustomerProvider>
   

   
  </React.StrictMode>,
  document.getElementById('root')
);