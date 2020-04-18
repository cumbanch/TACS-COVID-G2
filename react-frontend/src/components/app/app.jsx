import React, { Component } from "react";

export default class App extends Component {

  constructor(props) {
    super();
    this.state = {
      mock: ""
    };
  }

  componentDidMount() {
    fetch('http://localhost:8080/health', {
      method: 'GET',
    })
        .then(response => response.json())
        .then(console.log)
        .catch(console.log);
  }

  render() {
    return (
      <div className="container">
        <img
          src="https://image.shutterstock.com/image-photo/cute-kitty-260nw-281292863.jpg"
          alt="new"
        />
      </div>
    )
  }
}
