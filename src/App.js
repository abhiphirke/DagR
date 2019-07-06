import React, { Component } from "react";
import "./App.css";
import ApiContents from "./ApiContents";
import Navigator from "./Navigator";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      link: ""
    };
  }

  onChange = jsonUrl => this.setState({ link: jsonUrl });

  render() {
    const { link } = this.state;
console.log("definitionLink", link);
    return (
      <div className="App">
        <div className="header">
          <img className="logo" src="./images/tieto-logo.png" alt="" />
          <p className="pagetitle">CollecCredit Solutions and Services</p>
          <img src="./images/collections.jpeg"  alt="" />
        </div>
        <div className="content">
          <div className="navbar">
            <Navigator onChange={this.onChange} />
          </div>
          <div className="apicontents">
            {/* {link && <ApiContents link={link} />} */}
            <ApiContents link={link} />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
