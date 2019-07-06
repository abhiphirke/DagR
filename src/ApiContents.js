import React, { Component } from "react";
import SwaggerUI from 'swagger-ui';
import "../node_modules/swagger-ui/dist/swagger-ui.css";
import "./ApiContents.css";

class ApiContents extends Component {
  docRef;

  componentDidUpdate() {
    console.log("ApiContents", this.props.link);

    if (!this.props.link) {
      return;
    }

    SwaggerUI({
      domNode: this.docRef,
      url: this.props.link
    });
  }

  render() {
    return (
      <div className="contents">
        <div ref={(ref) => { this.docRef = ref; }} />
      </div>
    );
  }
}

export default ApiContents;
