import React, { Component } from "react";

class DateFormatter {
  constructor(date) {
    this.date = new Date(date);
  }

  formatDate() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // Zero out the time component for comparison
    today.setHours(0, 0, 0, 0);
    yesterday.setHours(0, 0, 0, 0);
    this.date.setHours(0, 0, 0, 0);

    if (this.date.getTime() === today.getTime()) {
      return 'Today';
    } else if (this.date.getTime() === yesterday.getTime()) {
      return 'Yesterday';
    } else {
      const options = { day: 'numeric', month: 'short' };
      return this.date.toLocaleDateString('en-US', options);
    }
  }
}

class ViewListEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: props.userid || "",
      entries: [],
      deliveries: [],
      customerName: '',
      selectedId: null,
      selectedCust: ""
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userid !== this.props.userid) {
      this.setState({ userid: this.props.userid }, () => {
        this.fetchDeliveries(this.state.userid);
      });
    }
  }

  componentDidMount() {
    this.fetchDeliveries(this.state.userid);
  }

  showDeliveryList = (id) => {
    console.log(id);
    this.setState({ selectedId: id });
  };

  fetchDeliveries = async (id) => {
    try {
      const response = await fetch(
        `https://us-central1-chedotech-85bbf.cloudfunctions.net/sakshiutwale/getDeliveryInfo/${id}`
      );
      const data = await response.json();

      if (response.ok) {
        const formattedDeliveries = data.map(delivery => ({
          ...delivery,
          date: new DateFormatter(new Date(delivery.date * 1000)).formatDate(),
        }));

        const customerName = formattedDeliveries.length > 0 ? formattedDeliveries[0].customerName : '';

        this.setState({ deliveries: formattedDeliveries, customerName });
      } else {
        console.error("Failed to fetch deliveries:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching deliveries:", error);
    }
  };

  // Function to get last 7 days dates in formatted way
  getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const formattedDate = new DateFormatter(date).formatDate();
      days.push(formattedDate);
    }
    return days;
  }

  isDeliveryAvailable = (formattedDate) => {
    return this.state.deliveries.some(delivery => delivery.date === formattedDate);
  }

  render() {
    const { customerName } = this.state;
    const last7Days = this.getLast7Days();

    return (
      <>
        <div className="container">
          <h2>Orders Checksheet</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Customer Name</th>
                {last7Days.map((day, index) => (
                  <th key={index}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{customerName}</td>
                {last7Days.map((day, index) => (
                  <td key={index}>
                    {this.isDeliveryAvailable(day) ? "✅" : "❌"}
                  </td>
                ))}

              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default ViewListEntry;
