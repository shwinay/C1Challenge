import React, { Component } from 'react'
import Jumbotron from "./components/Jumbotron"
import Form from "./components/Form"
import ContentCard from "./components/ContentCard"

class App extends Component {
  
  state={};

  render() {
    return (
      <React.Fragment>
        <Jumbotron />
        <Form />
      </React.Fragment>
    )
  }

}

export default App;
