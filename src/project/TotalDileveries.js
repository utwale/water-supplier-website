import React, { Component } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


const chartSetting = {
  yAxis: [
    {
      label: 'Deliveries',
    },
  ],
  width: 600,
  height: 400,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};

const valueFormatter = (value) => `${value} deliveries`;

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

class TotalDileveries extends Component {
  state = {
    dataset: [],
  };

  componentDidMount() {
    this.fetchDeliveryData();
  }

  fetchDeliveryData = async () => {
    try {
      const response = await axios.get('https://us-central1-chedotech-85bbf.cloudfunctions.net/sakshiutwale/getMonthlyDeliveryCount');
      if (response.data.success) {
        const { monthly } = response.data.deliveryCounts;
        const formattedDataset = this.formatDataset(monthly);
        this.setState({ dataset: formattedDataset });
      }
    } catch (error) {
      console.error("Error fetching delivery data:", error);
    }
  };

  formatDataset = (monthlyData) => {
    return Object.entries(monthlyData).map(([monthYear, count]) => {
      const [month, year] = monthYear.split('-');
      const formattedMonthYear = `${monthNames[month - 1]}'${year.slice(-2)}`;
      return { month: formattedMonthYear, deliveries: count };
    });
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
                <div>
                  <h2>Month Vs Deliveries Graph</h2>
                <BarChart
        dataset={this.state.dataset}
        xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
        series={[
          { dataKey: 'deliveries', label: 'Deliveries', valueFormatter },
        ]}
        {...chartSetting}
      />
                </div>
      </>
      
    );
  }
}

export default TotalDileveries;
