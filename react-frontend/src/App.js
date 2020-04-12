import React, { Component } from "react";

export default class App extends Component {

  constructor(props) {
    super();
    this.state = {
      mock: ""
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/login", {
      method: 'POST',
      mode: "no-cors",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue'
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ players: responseJson.result });
      },
      )
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
