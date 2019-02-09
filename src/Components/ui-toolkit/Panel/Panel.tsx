import React from "react";
import { PanelHeader } from "./PanelHeader";
import styled from 'styled-components/macro';
import PanelFooterPNG from "../../../Assets/panel-footer.png";

interface IPanelProps {
  children: JSX.Element[] | JSX.Element;
}

interface IHeaderProps {
  title: string;
}

interface IBodyProps {
  children: JSX.Element[] | JSX.Element;
}

export class Panel extends React.Component<IPanelProps, {}> {
  static Header = (hProps: IHeaderProps): JSX.Element => {
    return <PanelHeader title={hProps.title} />;
  };

  static Body = (bProps: IBodyProps): JSX.Element => {
    return <Content>{bProps.children}</Content>;
  };

  render(): JSX.Element {
    return <Container>{this.props.children}</Container>;
  }
}

const Container = styled.div`
  position: relative;
  width: 385px;
  display: inline-block;

  &::after {
    content: "";
    display: block;
    background: center 0 transparent url(${PanelFooterPNG})
      no-repeat;
    background-size: 105% 12px;
    position: absolute;
    right: 1px;
    left: 1px;
    bottom: -2px;
    height: 12px;
  }
`;

const Content = styled.div`
  border-left: 1px solid #d4d0ce;
  border-right: 1px solid #d4d0ce;
  background: #fff;
  margin-top: -2px;
  padding: 10px;
  height: 405px;
  overflow-y: auto;
`;