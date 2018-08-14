import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import { Dashboard } from "./Containers/Dashboard";
import  AboutMe  from "./Containers/AboutMe";
import HomePage from "./Containers/HomePage";

// TODO: research. React-router should not be necessary. Only react-router-dom
// src: https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            {/* Routes finds anything that matches description. Needs "exact" src: https://blog.pusher.com/getting-started-with-react-router-v4/ */}
            <Route exact={true} path="/" component={HomePage} />
            <Route exact={true} path="/DnD" component={Dashboard} />
            <Route exact={true} path="/AboutMe" component={AboutMe} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
