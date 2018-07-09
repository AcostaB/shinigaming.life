import React from "react";
import { Link } from "react-router-dom";

const testView = () => 
  <div style={{color: "white"}}>
    this is a test view
    <Link to="/Test2">
                Test2
    </Link>
  </div>;

export default testView;