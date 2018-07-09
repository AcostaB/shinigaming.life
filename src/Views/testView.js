import React from "react";
import { NavLink } from "react-router-dom";

const testView = () => 
  <div style={{color: "white"}}>
    this is a test view
    <NavLink to="/Test2">
                Test2
    </NavLink>
  </div>;

export default testView;