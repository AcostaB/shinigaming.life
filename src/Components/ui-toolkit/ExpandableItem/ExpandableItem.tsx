import React from "react";
import styled from 'styled-components/macro';
import ExpandableHeader from '../../../Assets/expandable-header.png';
import PlusMinusGreen from "../../../Assets/plus_minus-green.svg";

interface Props {
  expandableItemBody: JSX.Element | string;
  expandableItemHeader: JSX.Element | string;
}

interface IState {
  expanded: boolean;
}

export class ExpandableItem extends React.Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = { expanded: false };
  }

  handleExpandedClick = (): void => {
    this.setState((prevState, props) => ({ expanded: !prevState.expanded }));
  };

  renderBody(): JSX.Element | string {
    if (this.state != null && this.state.expanded) {
      return this.props.expandableItemBody;
    } else {
      return "";
    }
  }

  render(): JSX.Element {
    return (
      <div>
        <Header>
          <HeaderContent>{this.props.expandableItemHeader}</HeaderContent>
          <Icon onClick={this.handleExpandedClick} />
        </Header>
        {this.renderBody()}
      </div>
    );
  }
}

const Header = styled.div`
  background-image: url(${ExpandableHeader});
  z-index: 2;
  height: 45px;
  background-size: 100% 45px;
  display: flex;
  margin: 5px 5px 5px 5px;
  -webkit-align-items: center;
`;

const HeaderContent = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
  margin: 8px;
  -webkit-align-items: center;
`;

const Icon = styled.div`
  height: 16px;
  width: 16px;
  background: transparent 0 0 url(${PlusMinusGreen})
    no-repeat;
  background-size: cover;
  margin-left: 5px;
  cursor: pointer;
  display: flex;
  margin-right: 20px;
`;
