import React, { SFC } from "react";
import styled from 'styled-components/macro';

interface IProps {
  title: string;
}

export const PanelHeader: SFC<IProps> = ({ title }) => (
  <PanelHeader_Container>
    <PanelHeader_Text>{title.toUpperCase()}</PanelHeader_Text>
  </PanelHeader_Container>
);

const PanelHeader_Container = styled.div`
  background-image: url("../../../Assets/panel-header.png");
  background-size: 100% 100%;
  text-align: center;
`;

const PanelHeader_Text = styled.div`
  text-align: left;
  font-size: 20px;
  font-family: "Roboto Condensed", Roboto, Helvetica, sans-serif;
  text-transform: uppercase;
  font-weight: bold;
  padding: 15px 15px;
  color: #fff;
`;
