import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

export default class CustomerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img: "",
            customerName: "",
            contact: "",
            email: "",
            requirement: "",
            address: "",
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        const { img, customerName, contact, email, requirement, address } = this.state;
        const newCustomer = { img, customerName, contact, email, requirement, address };

        try {
            const response = await fetch(
                "https://us-central1-chedotech-85bbf.cloudfunctions.net/sakshiutwale/addCustomer",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newCustomer)
                }
            );

            if (response.ok) {
                const addedCustomer = await response.json();
                this.props.onAddingCustomer(addedCustomer);
                this.setState({
                    img: "", customerName: "", contact: "", email: "", requirement: "", address: ""
                });
            } else {
                console.error("Failed to add customer:", response.statusText);
            }
        } catch (error) {
            console.error("Error adding customer:", error);
        }
    };

    render() {
        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
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
                            <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                  <Link to="/homepage" className="nav-link">
                  <i class="fa-solid fa-house"></i> Home
                  </Link>
                </li>
                                <li className="nav-item">
                                    <Link to="/customerForm" className="nav-link">
                                        <i className="fa-solid fa-user"></i> Customer Form
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/customerList" className="nav-link">
                                    <i class="fa-solid fa-chart-simple"></i> Customer List
                                    </Link>
                                </li>
                                <li className="nav-item">
                    <Link to="/totalDeliveries" className="nav-link">
                      <i className="fa-solid fa-list-check"></i> Total Dileveries
                    </Link>
                  </li>
                            </ul>
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                    >
                                        <i className="fa-solid fa-user"></i> {this.context.auth?.email || 'User'}
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

                <div className="container-fluid p-5 mt-5" style={containerStyle}>
                    <div className="form-container" style={formContainerStyle}>
                        <h1 style={headerStyle}><b>Customer Form</b></h1>
                        <form onSubmit={this.handleSubmit}>
                            

                            <div className="mb-3 mt-4">
                                <label htmlFor="customerName" className="form-label">Customer Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="customerName"
                                    placeholder="Customer Name"
                                    name="customerName"
                                    value={this.state.customerName}
                                    onChange={this.handleChange}
                                    style={inputStyle}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="contact" className="form-label">Owner Contact</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="contact"
                                    placeholder="Contact"
                                    name="contact"
                                    value={this.state.contact}
                                    onChange={this.handleChange}
                                    style={inputStyle}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email ID</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    style={inputStyle}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="requirement" className="form-label">Requirement</label>
                                <input
                                    className="form-control"
                                    id="requirement"
                                    placeholder="Requirement of water"
                                    name="requirement"
                                    value={this.state.requirement}
                                    onChange={this.handleChange}
                                    style={inputStyle}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Address</label>
                                <input
                                    className="form-control"
                                    id="address"
                                    placeholder="Address"
                                    name="address"
                                    value={this.state.address}
                                    onChange={this.handleChange}
                                    style={inputStyle}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary" style={buttonStyle}>Save</button>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}

// Styles
const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f7f6',
};

const formContainerStyle = {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    maxWidth: '700px',
    width: '100%',
    marginTop:"100px",
   

};

const headerStyle = {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '28px',
    color: '#333',
};

const imageStyle = {
    width: '150px',
    height: '150px',
};

const inputStyle = {
    borderRadius: '6px',
    padding: '10px',
    border: '1px solid #ced4da',
    width: '100%',
    marginBottom: '15px',
};

const noteStyle = {
    color: '#888',
    fontSize: '12px',
    marginTop: '5px',
};

const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
};
