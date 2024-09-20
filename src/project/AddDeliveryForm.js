import React, { Component } from 'react';

export default class AddDeliveryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: props.selectedCustomer?.id || "",
      customerName: props.selectedCustomer?.customerName || "",
      date: "",
      quantity: "",
      by: "",
      formattedDate: ''
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userid !== this.props.userid) {
      this.setState({ userid: this.props.userid });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { userid, customerName, date, quantity, by } = this.state;
    const newDelivery = { userid, customerName, date, quantity, by };

    try {
      const response = await fetch(
        "https://us-central1-chedotech-85bbf.cloudfunctions.net/sakshiutwale/addDelivery",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newDelivery)
        }
        
      );
      console.log(JSON.stringify(newDelivery))
      if (response.ok) {
        const addedDelivery = await response.json();
        this.props.onAddingDelivery(addedDelivery);
        this.setState({
          userid: "",
          customerName:"",
          date: "",
          quantity: "",
          by: "",
          formattedDate: ''
        });
        
      } else {
        console.error("Failed to add delivery:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding delivery:", error);
    }
  };

  formatDate = () => {
    const input = this.state.date;
    if (input) {
      const date = new Date(input);
      const day = ('0' + date.getDate()).slice(-2);
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      console.log(formattedDate);
      this.setState({ formattedDate });
    } else {
      this.setState({ formattedDate: 'Please select a date.' });
    }
    
  };

  render() {
    const { userid,customerName, date, quantity, by, formattedDate } = this.state;

    return (
      <div>
        <h2>Add New Delivery</h2>
        <form onSubmit={this.handleSubmit}>
        <div className="form-group">
            <label htmlFor="userid">User ID</label>
            <input
              type="text"
              className="form-control"
              id="userid"
              value={userid}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="customerName">Customer Name</label>
            <input
              type="text"
              className="form-control"
              id="customerName"
              value={customerName}
              readOnly
            />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={date}
              onChange={this.handleChange}
              className="form-control"
              required
            />
            {/* <button type="button" onClick={this.formatDate} className="btn btn-secondary mt-2">
              Format Date
            </button>
            <div className="output" id="output">Formatted Date: {formattedDate}</div> */}
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={quantity}
              onChange={this.handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>By</label>
            <input
              type="text"
              name="by"
              value={by}
              onChange={this.handleChange}
              className="form-control"
              required
            />
          </div>
       
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
      </div>
    );
  }
}
