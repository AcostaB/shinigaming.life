import React, { Component } from 'react';
import {Dashboard} from '../src/Containers/Dashboard.js';
import './Styles/App.css';
import 'bootstrap/dist/css/bootstrap.css'
import './Styles/Ability.css';
import './Styles/Dashboard.css';
import './Styles/ExpandableItem.css';
import './Styles/LimitedUse.css';
import './Styles/Panel.css';
import './Styles/Skill.css';
import './Styles/Spell.css';

class App extends Component {
  render() {
    return (
      <Dashboard/>
    );
  }
}

export default App;