import React, { SFC } from "react";
import styled from 'styled-components/macro';

interface Props {
  text: string;
  onClick: () => void;
}

export const Button: SFC<Props> = (props) => <StyledButton onClick={props.onClick}> {props.text} </StyledButton>

const StyledButton = styled.button`
  border-radius: 3px;
  background-color: #96bf6b;
  color: #fff;
  font-family: Roboto Condensed,Roboto,Helvetica,sans-serif;
  font-size: 10px;
  border: 1px solid transparent;
  text-transform: uppercase;
  padding: 9px 15px;
  -webkit-transition: all 50ms;
  -o-transition: all 50ms;
  transition: all 50ms;
  -ms-flex: 1 1;
  flex: 1 1;
  margin: 5px;
`;