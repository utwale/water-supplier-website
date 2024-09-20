// CustomerDetail.js

import React from 'react';

const CustomerDetails = ({ customer, closeDetail }) => {
  if (!customer) return null;

  return (
    <div>
      <h3>Customer Details</h3>
      <p><strong>Name:</strong> {customer.customerName}</p>
      <p><strong>Contact:</strong> {customer.contact}</p>
      <p><strong>Email:</strong> {customer.email}</p>
      <p><strong>Requirement:</strong> {customer.requirement}</p>
      <p><strong>Address:</strong> {customer.address}</p>
      <button onClick={closeDetail}>Close</button>
    </div>
  );
};

export default CustomerDetails;
