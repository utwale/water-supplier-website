import React, { Component } from "react";
import { Navigate } from 'react-router-dom';
import CustomerContext from "./CustomerContext";
import wallpaper from '../assets/desktop-wallpaper-ocean.jpg';

export default class LoginPage extends Component {
  static contextType = CustomerContext;

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      authenticated: false,
      isSignUp: false,  // Toggle between login and signup
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.isSignUp) {
      // Handle Sign-Up logic here
      if (this.state.password !== this.state.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      // Sign-Up logic goes here (e.g., API call to create an account)
      alert('Account created successfully!');
    } else {
      // Handle Login logic here
      this.context.login(this.state.email); // Assuming this updates your authentication context
      this.setState({ authenticated: true });
    }
  };

  toggleForm = () => {
    this.setState((prevState) => ({
      isSignUp: !prevState.isSignUp,  // Toggle between Login and Sign-Up forms
    }));
  };

  render() {
    if (this.state.authenticated) {
      return <Navigate to="/homepage" />;
    }

    const pageStyle = {
      backgroundImage: `url(${wallpaper})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
    };

    const containerStyle = {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: '40px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px',
      width: '100%',
      textAlign: 'center',
    };

    const formStyle = {
      width: '100%',
      padding: '20px',
      backgroundColor: '#f2f2f2',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    };

    const inputStyle = {
      width: '100%',
      padding: '10px',
      marginBottom: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box',
    };

    const buttonStyle = {
      width: '100%',
      padding: '10px',
      backgroundColor: '#000',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
    };

    const toggleText = this.state.isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up";

    return (
      <>
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          html, body {
            height: 100%;
            width: 100%;
            overflow-x: hidden; /* Prevent horizontal scrolling */
          }
          body {
            margin: 0;
            padding: 0;
          }
          .navbar {
            margin-left: 0;
            margin-right: 0;
            width: 100%;
          }
          .container-fluid {
            padding-left: 0;
            padding-right: 0;
            margin-left: 0;
            margin-right: 0;
            width: 100%;
          }
        `}</style>

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <b>BLUE WATER</b>
            </a>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                {/* Additional navbar items if needed */}
              </ul>
            </div>
          </div>
        </nav>

        <div className="container-fluid" style={pageStyle}>
          <div style={containerStyle}>
            <form style={formStyle} onSubmit={this.handleSubmit}>
              <h2>{this.state.isSignUp ? "Sign Up" : "Login"}</h2>
              <input
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
                name="email"
                style={inputStyle}
                placeholder="Email"
                required
              />
              <input
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
                name="password"
                style={inputStyle}
                placeholder="Password"
                required
              />
              {this.state.isSignUp && (
                <input
                  type="password"
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                  name="confirmPassword"
                  style={inputStyle}
                  placeholder="Confirm Password"
                  required
                />
              )}
              <button type="submit" style={buttonStyle}>
                {this.state.isSignUp ? "Sign Up" : "Login"}
              </button>
            </form>
            <p style={{ marginTop: "10px", cursor: 'pointer' }} onClick={this.toggleForm}>
              {toggleText}
            </p>
          </div>
        </div>
      </>
    );
  }
}
