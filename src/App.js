import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import './App.css';
import testView from "./Views/testView";

// TODO: Added a symbolic link in order to be able to import packages from the children folders. This seems a bit odd tho. Research other options.
// TODO need to improve on the symbolic link. Should not point to everything, and instead point to only a few necessary things like a build output. 

import App from "DnD/src/App";

// TODO: research. React-router should not be necessary. Only react-router-dom
// src: https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf

class App2 extends Component {
  render() {
    return (
      <div className="App">
      <BrowserRouter>
        <Switch>
          {/* // TODO The order of the links seems to make a difference. Research this.  */}
          {/* Routes finds anything that matches description. Needs "exact" src: https://blog.pusher.com/getting-started-with-react-router-v4/ */}
          <Route exact path="/" component={testView}/>
          <Route exact path="/DnD" component={App}/>
        </Switch>
      </BrowserRouter>
      </div>
    );
  }
}

export default App2;
