import React, { SFC } from "react";
import styled from 'styled-components/macro';
import PanelHeaderPNG from '../../../Assets/panel-header.png';

interface IProps {
  title: string;
}

export const PanelHeader: SFC<IProps> = ({ title }) => (
  <Container>
    <Text>{title.toUpperCase()}</Text>
  </Container>
);

const Container = styled.div`
  background-image: url(${PanelHeaderPNG});
  background-size: 100% 100%;
  text-align: center;
`;

const Text = styled.div`
  text-align: left;
  font-size: 20px;
  font-family: "Roboto Condensed", Roboto, Helvetica, sans-serif;
  text-transform: uppercase;
  font-weight: bold;
  padding: 15px 15px;
  color: #fff;
`;
