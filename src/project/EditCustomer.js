import React, { Component } from "react";

class EditCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.customer.id,
      customerName: props.customer.customerName,
      url: props.customer.url,
      contact: props.customer.contact,
      email: props.customer.email,
      requirement: props.customer.requirement,
      address:props.customer.address
    };
  }

  componentDidMount() {
    console.log("Hello editing ...");
    console.log(this.customer);
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.props.updateCustomer(this.state);
    const {id, url, customerName, contact ,email, requirement} = this.state;
    console.log(this.state);
    const { name, value } = e.target;
    this.setState((prevState) => ({
        updateCustomer: {
        ...prevState.updateCustomer,
        [name]: value,
      },
     }));
try {
      
  const {id, url, customerName, contact ,email, requirement ,address} = this.state;
  const newCustomer = {id, url, customerName, contact ,email, requirement,address };
const response = await fetch(
  ` https://us-central1-chedotech-85bbf.cloudfunctions.net/sakshiutwale/updateCustomerDetails/${id}`,
  {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
   },
     body: JSON.stringify(newCustomer), 
  }
);

if (response.ok) {
  const editedCustomer = await response.json();
  this.props.onEditingCustomer(editedCustomer);
  this.setState({
    url:"", customerName:"", contact :"",email:"", requirement:"", address:"",
  
  });
} else {
  console.error("Failed to edit customer:", response.statusText);
}
} catch (error) {
console.error("Error edit customer:", error);
}
};

  render() {
    const {  url, customerName, contact ,email, requirement,address} = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Edit Customer Info</h2>
        <div className="mb-3">
          <input
            type="text"
            name="url"
            className="form-control"
            value={url}
            onChange={this.handleInputChange}
            placeholder="image"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="customerName"
            className="form-control"
            value={customerName}
            onChange={this.handleInputChange}
            placeholder="Customer Name"
          />
        </div>
       
        <div className="mb-3">
          <input
            type="text"
            name="contact"
            className="form-control"
            value={contact}
            onChange={this.handleInputChange}
            placeholder="contact"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="email"
            className="form-control"
            value={email}
            onChange={this.handleInputChange}
            placeholder="email"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="requirement"
            className="form-control"
            value={requirement}
            onChange={this.handleInputChange}
            placeholder="requirement"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="address"
            className="form-control"
            value={address}
            onChange={this.handleInputChange}
            placeholder="address"
          />
        </div>

        <button className="btn btn-primary me-2" >Update</button>
      </form>
    );
  }
}
export default EditCustomer;
