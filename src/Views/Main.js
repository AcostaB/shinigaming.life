import React from "react";
import { NavLink } from "react-router-dom";
import "./Main.css";

const Main = () => 
  <div className="App-main">
    <div className="App-main-header">
          Welcome to
        </div>
        <div className="App-main-logo"/>
        <div className="App-main-title">
          <div className="App-main-title-part">SHINI</div>
          <div className="App-main-title-part">GAMING.</div>
          <div className="App-main-title-part">LIFE</div>
        </div>
        <div className="App-main-subtext">
          My perpetually changing hobby website for learning and trying new web technologies.
        </div>
        <div className="App-main-name">
         BRYAND ACOSTA
        </div>
        <div className="App-main-links">
          <div className="App-main-link">
            <button className="App-main-link-button">
              Button One
            </button>
            <div className="App-main-link-description">
              This is the description for the first button. Text will likely be very long, but it will still look really awesome!!
            </div>
          </div>
          <div className="App-main-link">
            <button className="App-main-link-button">
              Button One
            </button>
            <div className="App-main-link-description">
              This is the description for the first button. Text will likely be very long, but it will still look really awesome!!
            </div>
          </div>
          <div className="App-main-link">
            <button className="App-main-link-button">
              Button One
            </button>
            <div className="App-main-link-description">
              This is the description for the first button. Text will likely be very long, but it will still look really awesome!!
            </div>
          </div>
          <div className="App-main-link">
            <button className="App-main-link-button">
              <NavLink to="/DnD">
                Test
              </NavLink>
            </button>
            <div className="App-main-link-description">
              This is the description for the first button. Text will likely be very long, but it will still look really awesome!!
            </div>
          </div>
        </div>
  </div>;

export default Main;