import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from "./project/HomePage";
import CustomerList from './project/CustomerList';
import CustomerForm from './project/CustomerForm';
import LoginPage from './project/LoginPage';
import CustomerContext from './project/CustomerContext';
import DeliveryList from './project/DeliveryList';
import TotalDileveries from './project/TotalDileveries';


class App extends React.Component {
  static contextType = CustomerContext;

  render() {
   
    return (
      <>
      <div className='container-fluid'>
        <Router>

          <div className="content">
            <Routes>
              
              <Route path="/" element={<LoginPage/>} />
              <Route path="/homepage" element={<HomePage />} />
              <Route path="/customerForm" element={<CustomerForm />} />
              <Route path="/customerList" element={<CustomerList />} />
              <Route path="/deliverylist" element={<DeliveryList />} />
              <Route path="/totalDeliveries" element={<TotalDileveries/>} />

            </Routes>
          </div>
        </Router>
      </div>
      </>
      
    );
  }
}

export default App;


