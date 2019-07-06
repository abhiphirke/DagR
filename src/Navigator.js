import React, { Component } from "react";
import "./Navigator.css";

class Navigator extends Component {
  state = {
    navigator: null,
    activeApp: null,
    activeVersion: null,
    activeService: null
  };

  componentWillMount = () => {
    this.getNavigatorConfig();
  }

  componentDidUpdate = () => {
  }

  getNavigatorConfig = () => {
    fetch("http://localhost:3000/docs/navigator.json")
      .then(response => response.json())
      .then(navigator => this.setState({ navigator: navigator }));
  }

  appClicked = app => (this.state.activeApp !== app.name && this.setState({ activeApp: app.name, activeVersion: null, activeService: null }));
  versionClicked = version => (this.state.activeVersion !== version.name && this.setState({ activeVersion: version.name }));
  serviceClicked = service => this.state.activeService !== service.name && this.setState({ activeService: service.name}, () => this.props.onChange(service.jsonUrl));

  render() {
    const { navigator, activeApp } = this.state;
    if (!navigator)
      return null;

    return (
      <div>
        {
          navigator.apps.map((app, i) =>
            <div key={`a${i}`} className="app">
              <div
                className={"app-title" + (app.name === activeApp ? " selected" : "")}
                onClick={() => this.appClicked(app)}>
                {app.name}
              </div>
              <div className="app-children">
                {activeApp === app.name && this.renderVersions(app)}
              </div>
            </div>
          )
        }
      </div>
    );
  }

  renderVersions = app => {
    const { activeVersion } = this.state;

    return app.versions.map((version, j) => {
      return (
        <div key={`v${j}`} className="version">
          <div
            className={"version-title" + (version.name === activeVersion ? " selected" : "")}
            onClick={() => this.versionClicked(version)}
          >
            {version.name}
          </div>
          <div className="version-children">
            {activeVersion === version.name && this.renderServices(version)}
          </div>
        </div>
      )
    });
  }

  renderServices = version => {
    const { activeService } = this.state;

    return version.services.map((service, k) => {
      return (
        <div
          key={`s${k}`}
          className={"service" + (service.name === activeService ? " selected" : "")}
          onClick={() => this.serviceClicked(service)}>
          {service.name}
        </div>);
    })
  }
}

export default Navigator;
