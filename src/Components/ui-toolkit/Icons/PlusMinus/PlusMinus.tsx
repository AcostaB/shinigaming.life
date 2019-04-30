import React, { FC } from "react";
import PlusMinusSign from "../../../../Assets/plus_minus-white.svg";
import styled, { css } from 'styled-components/macro';

type Colors = "green" | "darkred";

interface Props {
  isPlus: boolean;
  backgroundColor?: Colors;
  onClick: () => void;
}

export const PlusMinus: FC<Props> = (props) => <StyledPlusMinus {...props} />;


// TODO improve on the prop usage on the margin-left.
// TODO the icons have repeated styles.
// TODO improve the css styling and positioning of the plus and minus signs
const StyledPlusMinus = styled.button<{ backgroundColor?: Colors, isPlus: boolean }>`
  display: inline-block;
  border-radius: 3px;
  color: #fff;
  font-family: "Roboto Condensed", Roboto, Helvetica, sans-serif;
  font-size: 10px;
  border: 1px solid transparent;
  text-transform: uppercase;
  height: 20px;
  width: 25px;
  padding: 0;
  cursor: pointer;
  background-color: ${props => (props.backgroundColor === "darkred" ? "darkred" : "#96bf6b")};
  &::before {
    content: "";
    display: block;
    height: 14px;
    width: 12px;
    background-image: url(${PlusMinusSign});
    background-size: cover;
    background-repeat: no-repeat;
    ${props => (props.isPlus ? PlusStyles : MinusStyles)}
  }
`;

const PlusStyles = css`
  background-position: 0 0;
  margin-left: 5px;
  width: 15px;
`;

const MinusStyles = css`
  background-position: -17px 0;
  margin-left: 6px;
`;