import React, { Component } from "react";

export default class DeliveryUpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: props.userid || "",
      date: "",
      quantity: "",
      by: "",
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
    const { userid, date, quantity, by } = this.state;
    const newDelivery = { userid, date, quantity, by };
    // this.props.addDelivery(newDelivery);
    console.log(newDelivery);
    try {
      const response = await fetch(
        "http://localhost:5000/chedotech-85bbf/us-central1/sakshiutwale/addDelivery",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body:  JSON.stringify(newDelivery)
        }
      );
    } catch (error) {
      console.error("Error adding delivery:", error);
    }

    if (response.ok) {
   const addedDelivery = await response.json();
    this.props.onAddingDelivery(addedDelivery);

     this.setState({
     userid: '',
     date: '',
     quantity: '',
     by: ''
    });
  } else {
      console.error("Failed to add delivery:", response.statusText);
  }
};
 catch (error) {
  console.error("Error adding delivery:", error);
}
};



  render() ;{
    const { userid, date, quantity, by } = this.state;

    return (
      
        <div>
          <h2>Add Delivery</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>User Id</label>
              <input
                type="text"
                name="userid"
                value={userid}
                onChange={this.handleChange}
                className="form-control"
                required
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input
                type="text"
                name="date"
                value={date}
                onChange={this.handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="text"
                name="quantity"
                value={quantity}
                onChange={this.handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>by</label>
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
  
