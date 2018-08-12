import React, { SFC } from "react";
import { Character } from "../../Models/Character";
import Stat from "../../Models/Stat";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { IAppStore, MappedState, MappedDispatch } from "../../Types/Types";
import { Actions } from "../../Actions/dndActions";
import styled from "styled-components";
import PlusMinusSign from "../../Assets/plus_minus-white.svg";

// TODO: this file can and should be broken down into smaller components.

interface IProps {
  character: Character;
  remainingHealth: number;
  decreaseHealthHandler: () => void;
  increaseHealthHandler: () => void;
  decreaseHealthBy10Handler: () => void;
  increaseHealthBy10Handler: () => void;
}

export const HeaderBase: SFC<IProps> = (props: IProps) => {
  const renderHeaderMain = () => (
    <HeaderMain>
      <div>
        <Name>{props.character.name}</Name>
        <RaceClassLevel>
          {props.character.race +
            " " +
            props.character.class +
            " " +
            props.character.level}
        </RaceClassLevel>
      </div>
    </HeaderMain>
  );

  const renderSingleStat = (stat: Stat) => (
    <StatDiv key={stat.description}>
      <StatCategory>{stat.category}</StatCategory>
      <StatValue>
        <StatValueMod>{stat.mod} </StatValueMod>
        <StatValueNumber>{stat.value} </StatValueNumber>
        <StatValuePostText>{stat.valuePostText} </StatValuePostText>
      </StatValue>
      <StatDescription>{stat.description}</StatDescription>
    </StatDiv>
  );

  const renderHeaderStats = () => (
    <Stats>{props.character.stats.map(stat => renderSingleStat(stat))}</Stats>
  );

  const renderTracker = () => (
    <Tracker>
      <HealthTracker>
        <HealthTrackerLabel>HIT POINTS</HealthTrackerLabel>
        <HealthTrackerTracker>
          <DecreaseIcon red={true} onClick={props.decreaseHealthBy10Handler} />
          <DecreaseIcon onClick={props.decreaseHealthHandler} />
          <HealthTrackerHealth>
            {props.remainingHealth}/{props.character.maximumHealth}
          </HealthTrackerHealth>
          <IncreaseIcon onClick={props.increaseHealthHandler} />
          <IncreaseIcon red={true} onClick={props.increaseHealthBy10Handler} />
        </HealthTrackerTracker>
      </HealthTracker>
      <InspirationTracker>INSPIRATION</InspirationTracker>
    </Tracker>
  );

  return (
    <HeaderContainer>
      {renderHeaderMain()}
      {renderHeaderStats()}
      {renderTracker()}
    </HeaderContainer>
  );
};

const mapStateToProps = (state: IAppStore): MappedState<IProps> => ({
  character: state.character,
  remainingHealth: state.remainingHealth
});

const mapDispatchToProps = (dispatch: Dispatch): MappedDispatch<IProps> => ({
  decreaseHealthHandler: () => dispatch(Actions.decreaseHealth()),
  increaseHealthHandler: () => dispatch(Actions.increaseHealth()),
  decreaseHealthBy10Handler: () => dispatch(Actions.decreaseHealthBy10()),
  increaseHealthBy10Handler: () => dispatch(Actions.increaseHealthBy10())
});

const Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderBase);

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  -webkit-align-items: center;
  height: 130px;
  padding: 0 15px;
`;

const HeaderMain = styled.div`
  display: flex;
  flex: 2;
`;

const Stats = styled.div`
  display: flex;
  flex: 1;
`;

const Tracker = styled.div`
  display: flex;
`;

const Name = styled.div`
  font-size: 28px;
  color: #fff;
  font-family: "Roboto Condensed", Roboto, Helvetica, sans-serif;
  line-height: 1.1;
  text-align: left;
`;

const RaceClassLevel = styled.div`
  font-size: 12px;
  color: #979aa4;
  text-align: left;
`;

const StatDiv = styled.div`
  margin-right: 20px;
`;

const StatCategory = styled.div`
  font-size: 7px;
  font-weight: bold;
  text-align: center;
  line-height: 1;
  height: 9px;
  color: #96bf6b;
  text-transform: uppercase;
  text-align: center;
`;

const StatValue = styled.div`
  text-align: center;
`;

const StatValueNumber = styled.span`
  font-size: 26px;
  text-align: center;
  color: #fff;
  width: auto;
`;

// TODO this one and the next one are identical. figure this out.
const StatValueMod = styled.span`
  text-align: center;
  color: #979aa4;
  vertical-align: super;
  font-size: 9px;
  font-weight: normal;
`;

const StatValuePostText = styled.span`
  text-align: center;
  color: #979aa4;
  vertical-align: super;
  font-size: 9px;
  font-weight: normal;
`;

const StatDescription = styled.div`
  font-size: 10px;
  max-width: 65px;
  margin: 0 auto;
  text-align: center;
  color: #fff;
`;

const HealthTracker = styled.div`
  position: relative;
  border: 1px solid #96bf6b;
  border-radius: 3px;
  text-align: center;
  font-family: Roboto, Helvetica, sans-serif;
  padding: 5px 20px 5px 20px;
`;

const HealthTrackerTracker = styled.div`
  display: flex;
  -webkit-align-items: center;
`;

const HealthTrackerLabel = styled.div`
  font-size: 10px;
  text-align: center;
  font-family: Roboto, Helvetica, sans-serif;
  color: #fff;
`;

// TODO improve on the prop usage on the margin-left.
// TODO the icons have repeated styles.
// TODO improve the css styling and positioning of the plus and minus signs
const IncreaseIcon = styled.button<{ red?: boolean }>`
  display: inline-block;
  border-radius: 3px;
  background-color: ${props => (props.red ? "darkred" : "#96bf6b")};
  color: #fff;
  font-family: "Roboto Condensed", Roboto, Helvetica, sans-serif;
  font-size: 10px;
  border: 1px solid transparent;
  text-transform: uppercase;
  height: 20px;
  width: 27px;
  ${props => (props.red ? "margin-left: 10px;" : "")} &::before {
    content: "";
    display: block;
    height: 14px;
    width: 14px;
    background-image: url(${PlusMinusSign});
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: cover;
  }
`;

const DecreaseIcon = styled.button<{ red?: boolean }>`
  display: inline-block;
  border-radius: 3px;
  background-color: ${props => (props.red ? "darkred" : "#96bf6b")};
  color: #fff;
  font-family: "Roboto Condensed", Roboto, Helvetica, sans-serif;
  font-size: 10px;
  border: 1px solid transparent;
  text-transform: uppercase;
  height: 20px;
  width: 27px;

  ${props => (props.red ? "margin-right: 10px;" : "")} &::before {
    content: "";
    display: block;
    height: 14px;
    width: 14px;
    background-image: url(${PlusMinusSign});
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: -17px 0;
  }
`;

const HealthTrackerHealth = styled.div`
  font-size: 24px;
  letter-spacing: -1px;
  line-height: 1;
  text-align: center;
  font-family: Roboto, Helvetica, sans-serif;
  color: #fff;
  padding: 0 10px 0 10px;
`;

const InspirationTracker = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  border-color: #96bf6b;
  border-radius: 3px;
  color: #fff;
  font-family: "Roboto Condensed", Roboto, Helvetica, sans-serif;
  border: 1px solid #96bf6b;
  text-transform: uppercase;
  width: 100%;
  display: block;
  font-size: 8px;
  padding: 5px;
  margin-top: 5px;
`;
