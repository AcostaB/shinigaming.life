import React, { SFC } from "react";
import { Character } from "../../Models/Character";
import Stat from "../../Models/Stat";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { IAppStore, MappedState, MappedDispatch } from "../../Types/Types";
import { Actions } from "../../Actions/dndActions";
import styled from 'styled-components/macro';
import { PlusMinus } from "../ui-toolkit/Icons/PlusMinus/PlusMinus";

// TODO: this file can and should be broken down into smaller components.

interface Props {
  character: Character;
  remainingHealth: number;
  decreaseHealthHandler: () => void;
  increaseHealthHandler: () => void;
  decreaseHealthBy10Handler: () => void;
  increaseHealthBy10Handler: () => void;
}

export const HeaderBase: SFC<Props> = (props: Props) => {
  const renderHeaderMain = () => (
    <HeaderMain>
      <div>
        <HeaderName>{props.character.name}</HeaderName>
        <HeaderRaceClassLevel>
          {props.character.race +
            " " +
            props.character.class +
            " " +
            props.character.level}
        </HeaderRaceClassLevel>
      </div>
    </HeaderMain>
  );

  const renderSingleStat = (stat: Stat) => (
    <HeaderStatDiv key={stat.description}>
      <HeaderStatCategory>{stat.category}</HeaderStatCategory>
      <HeaderStatValue>
        <HeaderStatValueMod>{stat.mod} </HeaderStatValueMod>
        <HeaderStatValueNumber>{stat.value} </HeaderStatValueNumber>
        <HeaderStatValuePostText>
          {stat.valuePostText}{" "}
        </HeaderStatValuePostText>
      </HeaderStatValue>
      <HeaderStatDescription>{stat.description}</HeaderStatDescription>
    </HeaderStatDiv>
  );

  const renderHeaderStats = () => (
    <HeaderStats>
      {props.character.stats.map(stat => renderSingleStat(stat))}
    </HeaderStats>
  );

  const renderTracker = () => (
    <HeaderTracker>
      <HeaderHealthTracker>
        <HeaderHealthTrackerLabel>HIT POINTS</HeaderHealthTrackerLabel>
        <HeaderHealthTrackerTracker>
          <StyledPlusMinus
            isPlus={false}
            backgroundColor={"darkred"}
            onClick={props.decreaseHealthBy10Handler}
          />
          <StyledPlusMinus isPlus={false} onClick={props.decreaseHealthHandler} />
          <HeaderHealthTrackerHealth>
            {props.remainingHealth}/{props.character.maximumHealth}
          </HeaderHealthTrackerHealth>
          <StyledPlusMinus isPlus={true} onClick={props.increaseHealthHandler} />
          <StyledPlusMinus isPlus={true}
            backgroundColor={"darkred"}
            onClick={props.increaseHealthBy10Handler}
          />
        </HeaderHealthTrackerTracker>
      </HeaderHealthTracker>
      <HeaderInspirationTracker>INSPIRATION</HeaderInspirationTracker>
    </HeaderTracker>
  );

  return (
    <HeaderContainer>
      {renderHeaderMain()}
      {renderHeaderStats()}
      {renderTracker()}
    </HeaderContainer>
  );
};

const mapStateToProps = (state: IAppStore): MappedState<Props> => ({
  character: state.character,
  remainingHealth: state.remainingHealth
});

const mapDispatchToProps = (dispatch: Dispatch): MappedDispatch<Props> => ({
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

const HeaderStats = styled.div`
  display: flex;
  flex: 1;
`;

const HeaderTracker = styled.div`
  display: flex;
`;

const HeaderName = styled.div`
  font-size: 28px;
  color: #fff;
  font-family: "Roboto Condensed", Roboto, Helvetica, sans-serif;
  line-height: 1.1;
  text-align: left;
`;

const HeaderRaceClassLevel = styled.div`
  font-size: 12px;
  color: #979aa4;
  text-align: left;
`;

const HeaderStatDiv = styled.div`
  margin-right: 20px;
`;

const HeaderStatCategory = styled.div`
  font-size: 7px;
  font-weight: bold;
  text-align: center;
  line-height: 1;
  height: 9px;
  color: #96bf6b;
  text-transform: uppercase;
  text-align: center;
`;

const HeaderStatValue = styled.div`
  text-align: center;
`;

const HeaderStatValueNumber = styled.span`
  font-size: 26px;
  text-align: center;
  color: #fff;
  width: auto;
`;

// TODO this one and the next one are identical. figure this out.
const HeaderStatValueMod = styled.span`
  text-align: center;
  color: #979aa4;
  vertical-align: super;
  font-size: 9px;
  font-weight: normal;
`;

const HeaderStatValuePostText = styled.span`
  text-align: center;
  color: #979aa4;
  vertical-align: super;
  font-size: 9px;
  font-weight: normal;
`;

const HeaderStatDescription = styled.div`
  font-size: 10px;
  max-width: 65px;
  margin: 0 auto;
  text-align: center;
  color: #fff;
`;

const HeaderHealthTracker = styled.div`
  position: relative;
  border: 1px solid #96bf6b;
  border-radius: 3px;
  text-align: center;
  font-family: Roboto, Helvetica, sans-serif;
  padding: 5px 20px 5px 20px;
`;

const HeaderHealthTrackerTracker = styled.div`
  display: flex;
  -webkit-align-items: center;
`;

const HeaderHealthTrackerLabel = styled.div`
  font-size: 10px;
  text-align: center;
  font-family: Roboto, Helvetica, sans-serif;
  color: #fff;
`;

const HeaderHealthTrackerHealth = styled.div`
  font-size: 24px;
  letter-spacing: -1px;
  line-height: 1;
  text-align: center;
  font-family: Roboto, Helvetica, sans-serif;
  color: #fff;
  padding: 0 10px 0 10px;
`;

const HeaderInspirationTracker = styled.div`
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

const StyledPlusMinus = styled(PlusMinus)`
  margin: 0 3px;
`;