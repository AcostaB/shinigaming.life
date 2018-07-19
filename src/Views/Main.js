import React from "react";
import { NavLink } from "react-router-dom";
import "./Main.css";

// TODO: Don't like having this file in a "view" folder.

// TODO: Create a component for the button link and description

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
              <NavLink to="/DnD">
                <button className="App-main-link-button">
                    DnD
                </button>
              </NavLink>
            <div className="App-main-link-description">
              Recreated the DnD character sheet found in DnDBeyond.com. Built using React, Typescript, and Redux. 
            </div>
          </div>
          <div className="App-main-link disabled">
            <button className="App-main-link-button disabled">
              Coming soon.
            </button>
            <div className="App-main-link-description">
              MMORPG character simulator created using Aurelia and QUnit. 
            </div>
          </div>
          <div className="App-main-link">
            <button className="App-main-link-button disabled">
              Coming soon.
            </button>
            <div className="App-main-link-description">
              Here you can read more about my skills as a developers and what previous coworkers have to say about me.
            </div>
          </div>
          <div className="App-main-link">
            <a href="https://github.com/shinigaming/shinigaming.life/tree/master">
              <button className="App-main-link-button">
                Github
              </button>
            </a>
            <div className="App-main-link-description">
              Check out the source code behind this site.
            </div>
          </div>
        </div>
  </div>;

export default Main;