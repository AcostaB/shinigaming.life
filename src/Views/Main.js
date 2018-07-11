import React from "react";
import { NavLink } from "react-router-dom";
import "./Main.css";

const Main = () => 
  <div>
    <div className="header">
          Welcome to
        </div>
        <div className="logo"/>
        <div className="title">
          <div className="title-part">SHINI</div>
          <div className="title-part">GAMING.</div>
          <div className="title-part">LIFE</div>
        </div>
        <div className="subtext">
          My perpetually changing hobby website for learning and trying new web technologies.
        </div>
        <div className="name">
         BRYAND ACOSTA
        </div>
        <div className="links">
          <div className="link">
            <button className="link-button">
              Button One
            </button>
            <div className="link-description">
              This is the description for the first button. Text will likely be very long, but it will still look really awesome!!
            </div>
          </div>
          <div className="link">
            <button className="link-button">
              Button One
            </button>
            <div className="link-description">
              This is the description for the first button. Text will likely be very long, but it will still look really awesome!!
            </div>
          </div>
          <div className="link">
            <button className="link-button">
              Button One
            </button>
            <div className="link-description">
              This is the description for the first button. Text will likely be very long, but it will still look really awesome!!
            </div>
          </div>
          <div className="link">
            <button className="link-button">
              <NavLink to="/DnD">
                Test
              </NavLink>
            </button>
            <div className="link-description">
              This is the description for the first button. Text will likely be very long, but it will still look really awesome!!
            </div>
          </div>
        </div>
  </div>;

export default Main;