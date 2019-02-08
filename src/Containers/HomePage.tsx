import React from "react";
import shinigami from '../Assets/Shinigami.png';
import { NavLink } from "react-router-dom";
import styled from "styled-components";

// const shinigami: string = 'asdfa'
// TODO: this isn't really a container file.
// TODO: Create a component for the button link and description

const HomePage = () => (
  <Home_Main>
    <Home_Header>Welcome to</Home_Header>
    <Home_Logo />
    <Home_Title>
      <Home_Title_Part>SHINI</Home_Title_Part>
      <Home_Title_Part>GAMING.</Home_Title_Part>
      <Home_Title_Part>LIFE</Home_Title_Part>
    </Home_Title>
    <Home_Title_Subtext>
      My perpetually changing hobby website for learning and trying new web
      technologies.
    </Home_Title_Subtext>
    <Home_Name>BRYAND ACOSTA</Home_Name>
    <Home_Links>
      <Home_Link>
        <NavLink to="/DnD">
          <Home_Button>DnD</Home_Button>
        </NavLink>
        <Home_Description>
          Recreated the DnD character sheet found in DnDBeyond.com. Built using
          React, Typescript, and Redux.
        </Home_Description>
      </Home_Link>
      <Home_Link>
        <button className="App-main-link-button">Coming soon.</button>
        <Home_Description>
          MMORPG character simulator created using Aurelia and QUnit.
        </Home_Description>
      </Home_Link>
      <Home_Link>
        <NavLink to="/AboutMe">
          <Home_Button>About Me</Home_Button>
        </NavLink>
        <Home_Description>
          Learn about my skills as a developers and what previous coworkers have
          to say about me.
        </Home_Description>
      </Home_Link>
      <Home_Link>
        <Home_Link_Button>
          <a href="https://github.com/shinigaming/shinigaming.life/tree/master">
            Github
          </a>
        </Home_Link_Button>
        <Home_Description>
          Check out the source code behind this site.
        </Home_Description>
      </Home_Link>
    </Home_Links>
  </Home_Main>
);

const Home_Main = styled.div`
  text-align: center;
  background-color: black;
  background-repeat: no-repeat;
  background-size: 100%;
  height: 100%;
`;

const Home_Header = styled.div`
  color: white;
  font-family: "AntipastoPro-Hairline";
  letter-spacing: 5px;
  font-size: 4em;
  padding-top: 30px;
`;

const Home_Logo = styled.div`
  width: 340px;
  height: 450px;
  background-image: url(${shinigami});
  background-repeat: no-repeat;
  background-size: 100%;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const Home_Title = styled.div`
  align-items: center;
  /* font-family: "evilGenius"; */
  font-family: "AntipastoPro-Hairline";
  font-size: 2em;
  /* background: linear-gradient(-90deg, #4BB9CD 0%, #0777A6 100%); */
  color: #4bb9cd;
  background: linear-gradient(-90deg,  red,  green);
`;

// Example of pseudo selectors in styled components.
const Home_Title_Part = styled.div`
  display: inline-block;
  letter-spacing: 5px;
  &::first-letter {
    font-size: 50px;
  }
`;

const Home_Title_Subtext = styled.div`
  color: white;
  font-family: "AntipastoPro-Hairline";
  letter-spacing: 5px;
  font-size: 18px;
  margin-top: 5px;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.2;
`;

const Home_Name = styled.div`
  color: white;
  font-family: "AntipastoPro-Hairline";
  letter-spacing: 5px;
  font-size: 22px;
  margin-top: 5px;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.2;
`;

const Home_Links = styled.div`
  display: block;
  margin-top: 20px;
`;

const Home_Link = styled.div`
  display: inline-block;
  width: 200px;
  vertical-align: top;
`;

const Home_Button = styled.div`
  -webkit-font-smoothing: antialiased;
  width: 180px;
  padding: 0.4em 0.2em;
  background: #009ed8;
  border: none;
  color: black;
  font-family: "AntipastoPro-Hairline";
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;

const Home_Description = styled.div`
  display: inline-block;
  margin: 0 10px 0 10px;
  font-family: "AntipastoPro-Hairline";
  font-size: 16px;
  color: white;
  letter-spacing: 1px;
  margin-top: 10px;
  line-height: 1.1;
`;

const Home_Link_Button = styled.button`
  -webkit-font-smoothing: antialiased;
  width: 180px;
  padding: 0.4em 0.2em;
  background: #009ed8;
  border: none;
  color: black;
  font-family: "AntipastoPro-Hairline";
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;

export default HomePage;
