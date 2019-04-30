import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import DemoExample1 from "./DemoExample1";
import DemoExample2 from "./DemoExample2";
import Test1 from "./Test1";
import Test2 from "./Test2";
import Test3 from "./Test3";
import Test4 from "./Test4";
import Test5 from "./Test5";

// Example for recursive: 
// https://stackoverflow.com/questions/51362652/how-do-i-represent-a-many-to-many-relationship-in-normalizr-js
// https://github.com/paularmstrong/normalizr/tree/6c5af279cc890a94fb7cde53a32811ccc7c2e28b/examples/relationships

class App extends Component {
  render() {
    return (
      <div>
        <header className="App App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="content">
        <Test5 />
        <Test4 />
        <Test3 />
          <Test2 />
          <Test1 />
          <DemoExample2 />
          <DemoExample1 />
        </div>
      </div >
    );
  }
}

export default App;
