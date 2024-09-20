import React, { Component } from "react";
import CustomerContext from "./CustomerContext";

export default class CustomerProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
    email: "",auth: { email: '', isAuthenticated: false },
  };
}

login = (email) => {
  console.log("login sucess CustomerProvider");
  this.setState({ auth: { email, isAuthenticated: true } });
};

logout = () => {
  this.setState({ auth: { email: '', isAuthenticated: false } });
};


  render() {
    return (
      <CustomerContext.Provider
      value={{
        auth: this.state.auth,
        login: this.login,
        logout: this.logout,
    }}
      >
        {this.props.children}
      </CustomerContext.Provider>
    );
  }
}
