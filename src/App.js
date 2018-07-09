import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import './App.css';
import Main from "./Views/Main";
import testView from "./Views/testView";

// TODO: research. React-router should not be necessary. Only react-router-dom
// src: https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf

class App extends Component {
  render() {
    return (
      <div className="App">
      <BrowserRouter>
        <Switch>
          {/* // TODO The order of the links seems to make a difference. Research this.  */}
          {/* Routes finds anything that matches description. Needs "exact" src: https://blog.pusher.com/getting-started-with-react-router-v4/ */}
          <Route exact path="/" component={testView}/>
          <Route exact path="/Test" component={Main}/>
          <Route exact path="/Test2" component={Main}/>
        </Switch>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
