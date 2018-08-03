import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import "./HomePage.css";

// TODO: Don't like having this file in a "view" folder.

// TODO: Create a component for the button link and description

const HomePage = () => (
  <Main>
    <Header>Welcome to</Header>
    <Logo />
    <Title>
      <TitlePart>SHINI</TitlePart>
      <TitlePart>GAMING.</TitlePart>
      <TitlePart>LIFE</TitlePart>
    </Title>
    <TitleSubtext>
      My perpetually changing hobby website for learning and trying new web
      technologies.
    </TitleSubtext>
    <Name>BRYAND ACOSTA</Name>
    <Links>
      <Link>
        <NavLink to="/DnD">
          <Button>DnD</Button>
        </NavLink>
        <Description>
          Recreated the DnD character sheet found in DnDBeyond.com. Built using
          React, Typescript, and Redux.
        </Description>
      </Link>
      <div className="App-main-link disabled">
        <button className="App-main-link-button disabled">Coming soon.</button>
        <Description>
          MMORPG character simulator created using Aurelia and QUnit.
        </Description>
      </div>
      <Link>
        <button className="App-main-link-button disabled">Coming soon.</button>
        <Description>
          Here you can read more about my skills as a developers and what
          previous coworkers have to say about me.
        </Description>
      </Link>
      <Link>
        <button className="App-main-link-button disabled">
          <a href="https://github.com/shinigaming/shinigaming.life/tree/master">
            Github
          </a>
        </button>
        <Description>Check out the source code behind this site.</Description>
      </Link>
    </Links>
  </Main>
);

const Main = styled.div`
  text-align: center;
  background-color: black;
  background-repeat: no-repeat;
  background-size: 100%;
  height: 100%;
`;

const Header = styled.div`
  color: white;
  font-family: "AntipastoPro-Hairline";
  letter-spacing: 5px;
  font-size: 4em;
  padding-top: 30px;
`;

const Logo = styled.div`
  width: 340px;
  height: 450px;
  background-image: url("../Assets/Shinigami.png");
  background-repeat: no-repeat;
  background-size: 100%;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.div`
  align-items: center;
  /* font-family: "evilGenius"; */
  font-family: "AntipastoPro-Hairline";
  font-size: 2em;
  /* background: linear-gradient(-90deg, #4BB9CD 0%, #0777A6 100%); */
  color: #4bb9cd;
  background: linear-gradient(-90deg,  red,  green);
`;

const TitlePart = styled.div`
  display: inline-block;
  letter-spacing: 5px;
`;

// .App-main-title-part::first-letter {
//   font-size: 50px;
// }

const TitleSubtext = styled.div`
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

const Name = styled.div`
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

const Links = styled.div`
  display: block;
  margin-top: 20px;
`;

const Link = styled.div`
  display: inline-block;
  width: 200px;
  vertical-align: top;
`;

const Button = styled.div`
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

const Description = styled.div`
  display: inline-block;
  margin: 0 10px 0 10px;
  font-family: "AntipastoPro-Hairline";
  font-size: 16px;
  color: white;
  letter-spacing: 1px;
  margin-top: 10px;
  line-height: 1.1;
`;

// .disabled {
//   cursor: default;
// }

export default HomePage;
