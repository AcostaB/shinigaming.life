import React, {
  Component
} from 'react';
import logo from './logo.svg';
import './App.css';

import {required, email} from './Validations';

import {InputWithValidation} from "./InputWithValidation";
import {FormControl, ControlLabel, FormGroup} from "react-bootstrap";

class App extends Component {

  constructor() {
    super();
    this.state = {
      name: "",
      email: ""
    }
  }

  handleNameChange = value => this.setState(() => ({name: value}))

  handleEmailChange = value => this.setState(() => ({email: value}))

  render() {
    return ( 
      <div className = "App">
        <header className = "App-header">
        <link rel="font" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/fonts/glyphicons-halflings-regular.woff2" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous"></link>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous"></link>
          <img 
            src={logo}
            className = "App-logo"
            alt = "logo" />
          <h1 className = "App-title">
            Welcome to React
          </h1> 
        </header>
        <InputWithValidation label="Name:" validators={[required]} value={this.state.name} onChange={this.handleNameChange}/>
        <InputWithValidation label="Email:" validators={[required, email]} value={this.state.email}  onChange={this.handleEmailChange}/>

        <form>
        <FormGroup
          controlId="formBasicText"
          validationState="error"
        >
          <ControlLabel>Working example with validation</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Enter text"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>
      </form>
      </div>
    );
  }
}

export default App;