import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import image from '../assets/pngtree-blue-creative-water-droplets-arc-picture-image_916262.png';
import CustomerContext from './CustomerContext';

export default class HomePage extends Component {
  static contextType = CustomerContext;

  constructor(props) {
    super(props);
    this.state = {
      customer: [],
    };
  }

  componentDidMount() {
    // Load FontAwesome icons
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
    link.integrity = 'sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==';
    link.crossOrigin = 'anonymous';
    link.referrerPolicy = 'no-referrer';
    document.head.appendChild(link);

    // Fetch customer data
    this.fetchCustomer();
  }

  fetchCustomer = async () => {
    try {
      const response = await fetch(
        'https://us-central1-chedotech-85bbf.cloudfunctions.net/sakshiutwale/getCustomerInfo'
      );
      const data = await response.json();
      this.setState({ customer: data });
    } catch (error) {
      console.error('Error fetching customer details:', error);
    }
  };

  render() {
    // General Page Styles
    const pageStyle = {
      backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.2)), url(${image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      width: '100vw',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    };

    // Body Style to remove white spaces and overflow
    const bodyStyle = {
      margin: 0,
      padding: 0,
      overflowX: 'hidden',
      width: '100%',
    };

    return (
      <>
        <style>{`
          body {
            margin: 0;
            padding: 0;
            overflow-x: hidden;
          }
          .container-fluid, .contact-section, .newsletter, .map-section {
            padding-left: 0;
            padding-right: 0;
            margin: 0;
            width: 100%;
          }
        `}</style>

        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-lg" style={{ width: '100%' }}>
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <b>BLUE WATER</b>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/homepage" className="nav-link">
                    <i className="fa-solid fa-house"></i> Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/customerForm" className="nav-link">
                    <i className="fa-solid fa-user"></i> Customer Form
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/customerList" className="nav-link">
                    <i className="fa-solid fa-list-check"></i> Customer List
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/totalDeliveries" className="nav-link">
                    <i className="fa-solid fa-chart-simple"></i> Total Deliveries
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav ms-auto">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    <i className="fa-solid fa-user"></i> {this.context.email}
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#" onClick={this.context.logout}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Background Section */}
        <div style={pageStyle}>
          <div className="text-center text-white">
            <h1 className="display-3"><b>BLUE WATER</b></h1>
            <p className="lead mb-4">
              Your trusted partner for water delivery services. Explore our offerings and manage your orders with ease!
            </p>
          </div>
        </div>

        {/* Google Map */}
        <div className="map-section my-5 ">
          <h3 className="text-center mb-4">Our Delivery Areas</h3>
          <div className="d-flex justify-content-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18..."
              width="100%"
              height="450"
              style={{ border: 0, }}
              allowFullScreen=""
              loading="lazy"
              title="Delivery Areas"
              className="shadow-sm rounded"
            ></iframe>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="newsletter bg-secondary text-white text-center py-5">
          <h3>Subscribe to our Newsletter</h3>
          <input
            type="email"
            placeholder="Enter your email"
            className="form-control d-inline w-50 my-3 shadow-sm"
          />
          <button className="btn btn-light btn-lg shadow-sm">Subscribe</button>
        </div>

       
         {/* Contact Section */}
         <div className="contact-section my-5 text-center">
          <h3>Contact Us</h3>
          <p>Email: <a href="mailto:support@bluewater.com">support@bluewater.com</a> | Phone: <a href="tel:+1234567890">+123-456-7890</a></p>
        </div>

        {/* Footer */}
        <footer className="footer bg-dark text-white py-4 mt-5">
          <div className="container text-center">
            <p>&copy; 2024 Blue Water. All rights reserved.</p>
            <div className="social-links">
              <a href="https://facebook.com" className="social-icon mx-2"><i className="fab fa-facebook"></i></a>
              <a href="https://twitter.com" className="social-icon mx-2"><i className="fab fa-twitter"></i></a>
              <a href="https://instagram.com" className="social-icon mx-2"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </footer>
      </>
    );
  }
}
