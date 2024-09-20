import React, { Component } from "react";

class DeliveryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: props.selectedCustomerId?.id || "",
      customerName: props.selectedCustomerId?.customerName || "",
      deliveries: [],
      searchQuery: '',
      sortOrder: 'asc', // or 'desc'
      sortBy: 'date', // 'date', 'quantity', or 'by'
     
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userid !== this.props.userid) {
      this.setState({ userid: this.props.userid });
    }
    
  }

  componentDidMount()
  {
    this.fetchDeliveries(this.state.userid);
  }

  fetchDeliveries = async (id) => {
    try {
      const response = await fetch(
        `https://us-central1-chedotech-85bbf.cloudfunctions.net/sakshiutwale/getDeliveryInfo/${id}`
      );
      const data = await response.json();

      if (response.ok) {
        const formattedDeliveries = data.map(delivery => ({
          ...delivery,
          date: new Date(delivery.date * 1000).toLocaleDateString('en-GB'),
        }));

        // Assuming all deliveries have the same customer name
        const customerName = formattedDeliveries.length > 0 ? formattedDeliveries[0].customerName : '';

        this.setState({ deliveries: formattedDeliveries, customerName });
        console.log(formattedDeliveries)
      } else {
        console.error("Failed to fetch deliveries:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching deliveries:", error);
    }
  };

  
  handleSearch = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSortOrderChange = (sortBy) => {
    this.setState((prevState) => ({
      sortOrder: prevState.sortOrder === 'asc' ? 'desc' : 'asc',
      sortBy
    }));
  };

  render() {
    const { deliveries, sortOrder, sortBy, searchQuery, userid ,customerName} = this.state;

    let filteredDeliveries = deliveries.filter(delivery =>
      delivery.by.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filteredDeliveries.sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc'
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'quantity') {
        return sortOrder === 'asc'
          ? a.quantity - b.quantity
          : b.quantity - a.quantity;
      } else if (sortBy === 'by') {
        return sortOrder === 'asc'
          ? a.by.localeCompare(b.by)
          : b.by.localeCompare(a.by);
      }
      return 0;
    });

    return (
      <div>
        
        <b>Customer Id:</b>
        <h6>{userid}</h6>

        <h6>Customer Name: {customerName}</h6>
        <h3>Delivery List</h3>

        <input
          type="text"
          placeholder="Search deliveries..."
          value={searchQuery}
          onChange={this.handleSearch}
        />

        <table className="table">
          <thead>
            <tr>
              
              <th>Date
                <button onClick={() => this.handleSortOrderChange('date')}>
                  <i className={`fa-solid fa-arrow-down-${sortOrder === 'asc' ? '9-1' : '1-9'}`}></i>
                </button>
              </th>
              <th>Quantity
                <button onClick={() => this.handleSortOrderChange('quantity')}>
                  <i className={`fa-solid fa-arrow-down-${sortOrder === 'asc' ? '9-1' : '1-9'}`}></i>
                </button>
              </th>
              <th>Delivered By
                <button onClick={() => this.handleSortOrderChange('by')}>
                  <i className={`fa-solid fa-arrow-down-${sortOrder === 'asc' ? 'a-z' : 'z-a'}`}></i>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredDeliveries.map((delivery, index) => (
              <tr key={index}>
                <td>{delivery.date}</td>
                <td>{delivery.quantity}</td>
                <td>{delivery.by}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DeliveryList;
