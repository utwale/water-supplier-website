import React, { Component } from "react";
import EditCustomer from "./EditCustomer";
import CustomerForm from "./CustomerForm";
import DeliveryList from "./DeliveryList";
import AddDeliveryForm from "./AddDeliveryForm";
import CustomerTable from "./CustomerTable";
import CustomerDetails from "./CustomerDetails";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


export default class CustomerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      currentCustomer: null,
      editing: false,
      selectedCust: "",
      adding: false,
      delivery: false,
      list: false,
      selectedCustomerId: null,
      vList: false,
      viewListEntries: null,
      viewingDetail: false,
      showCustomerListDe: true,
      deliveries: [],
      viewCustomerId: null,
    };
  }

  componentDidMount() {
    this.fetchCustomers();
  }

  fetchCustomers = async () => {
    try {
      const response = await fetch(
        "https://us-central1-chedotech-85bbf.cloudfunctions.net/sakshiutwale/getCustomerInfo"
      );
      const data = await response.json();
      this.setState({ customers: data });
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  addCustomer = (customer) => {
    this.setState((prevState) => ({
      customers: [...prevState.customers, customer],
      adding: false,
      showCustomerListDe: true,
    }));
  };

  editCustomer = (customer) => {
    this.setState({
      currentCustomer: customer,
      editing: true,
      showCustomerListDe: true,
      adding: false,
      delivery: false,
      list: false,
      vList: false,
      viewingDetail: false,
    });
  };

  deleteCustomer = async (id) => {
    try {
      const response = await fetch(
        `https://us-central1-chedotech-85bbf.cloudfunctions.net/sakshiutwale/deleteCustomer/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        this.setState((prevState) => ({
          customers: prevState.customers.filter(
            (customer) => customer.id !== id
          ),
        }));
      } else {
        console.error("Failed to delete customer:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  gotoCustomerForm = () => {
    this.setState({
      adding: true,
      showCustomerListDe: true,
      delivery: false,
      list: false,
      editing: false,
      viewingDetail: false,
      vList: false,
    });
  };

  updateCustomer = (updatedCustomer) => {
    this.setState((prevState) => ({
      customers: prevState.customers.map((customer) =>
        customer.id === updatedCustomer.id ? updatedCustomer : customer
      ),
      editing: false,
      showCustomerListDe: true,
      adding: false,
      delivery: false,
      list: false,
      viewingDetail: false,
      vList: false,
    }));
  };

  closeEditForm = () => {
    this.setState({ editing: false, showCustomerListDe: true });
  };

  // addDelivery = (customer) => {
  //   this.setState({
  //     delivery: true,
  //     selectedCust: customer.id,
  //     showCustomerListDe: true,
  //     adding: false,
  //     list: false,
  //     editing: false,
  //     viewingDetail: false,
  //     vList: false,
  //   });
  // };

  addDelivery = (customer) => {
    this.setState({
      delivery: true,
      selectedCust: customer.id,
      showCustomerListDe: true,
      adding: false,
      list: false,
      editing: false,
      viewingDetail: false,
      vList: false,
      selectedCustomer: customer, // Pass the selected customer object
    });
  };
  

  showDeliveryList = (id) => {
    this.setState({
      selectedCustomerId: id,
      list: true,
      showCustomerListDe: true,
      adding: false,
      delivery: false,
      editing: false,
      viewingDetail: false,
      vList: false,
    });
  };

  viewCustomerDetail = (customer) => {
    this.setState({
      currentCustomer: customer,
      viewingDetail: true,
      showCustomerListDe: true,
      adding: false,
      delivery: false,
      list: false,
      editing: false,
      vList: false,
    });
  };

  closeCustomerDetail = () => {
    this.setState({
      viewingDetail: false,
      showCustomerListDe: true,
      adding: false,
      delivery: false,
      list: false,
      editing: false,
      vList: false,
    });
  };
  

  render() {
    const {
      customers,
      currentCustomer,
      editing,
      adding,
      delivery,
      list,
      selectedCustomerId,
      selectedCustomer,
      vList,
      viewingDetail,
      showCustomerListDe,
      viewCustomerId
    } = this.state;

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
                      <i className="fa-solid fa-list-check"></i> Customer List
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/totalDeliveries" className="nav-link">
                    <i class="fa-solid fa-chart-simple"></i> Total Dileveries
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
                      <i className="fa-solid fa-user"></i> {this.context.auth?.email }
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
      <div className="container-fluid mt-3 p-5">
        <div className="row ">
          <div className="col-9 ">
            {showCustomerListDe && (
              <>
               <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-9">
                <h2>Customer List</h2>
                <button onClick={this.gotoCustomerForm}>Add customer</button>

                {/* Render CustomerTable here */}
                <CustomerTable customers={customers} />
                </div>
                <div className="col-3 p-5 ">
                  <h3></h3>
                  <p></p>
                  <br></br>
                <table className="table">
                  <tbody>
                    {customers.map((customer) => (
                      <React.Fragment key={customer.id}>
                        <tr>
                      
                          <td>
                            <div className="dropdown" style={{width:"30px"}}>
                              <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Actions
                              </button>
                              <ul className="dropdown-menu">
                                <li>
                                  <button
                                    className="btn me-2"
                                    onClick={() => this.editCustomer(customer)}
                                  >
                                    Edit
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="btn"
                                    onClick={() =>
                                      this.deleteCustomer(customer.id)
                                    }
                                  >
                                    Delete
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="btn"
                                    onClick={() =>
                                      this.addDelivery(customer)
                                    }
                                  >
                                    Add Delivery
                                  </button>
                                </li>
                                
                                <li>
                                  <button
                                    className="btn"
                                    onClick={() =>
                                      this.viewCustomerDetail(customer)
                                    }
                                  >
                                    View Details
                                  </button>
                                </li>
                               
                                <li>
                                  <button
                                    className="btn"
                                    onClick={() =>
                                      this.showDeliveryList(customer)
                                    }
                                  >
                                    Delivery list 
                                    </button>
                                </li>

                              </ul>
                            </div>
                          </td>
                        </tr>

                        {vList && customer.id === viewCustomerId && (
                          <tr>
                            <td colSpan="2">
                              <div className="col-md-12">
                                <table className="table table-striped">
                                  <thead>
                                    <tr>
                                      <th>Customer Name: {customer.name}</th>
                                    </tr>
                                    <tr>
                                      <th>Date</th>
                                      <th>Delivery Status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                   
                                  </tbody>
                                </table>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
                </div>
                </div>
                </div>
              </>
            )}
            </div>
 <div className="col-3">
            {editing && (
              <EditCustomer
                customer={currentCustomer}
                handleInputChange={this.handleInputChange}
                updateCustomer={this.updateCustomer}
                closeEditForm={this.closeEditForm}
              />
            )}
            {adding && (
              <CustomerForm
                addCustomer={this.addCustomer}
                customers={customers}
              />
            )}
           {delivery && (
           <AddDeliveryForm
                selectedCustomer={selectedCustomer} // Pass the selected customer object
                 showCustomerListDe={this.state.showCustomerListDe}
           />
           )}

            {list && (
              <DeliveryList
                selectedCustomerId={selectedCustomerId}
                showCustomerListDe={this.state.showCustomerListDe}
              />
            )}
            {viewingDetail && (
              <CustomerDetails
                customer={currentCustomer}
                closeCustomerDetail={this.closeCustomerDetail}
              />
            )}
            </div>
      
        </div>
      </div>
      </>
    );
  }
}
