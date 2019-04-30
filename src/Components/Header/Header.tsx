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
    <Header_Main>
      <div>
        <Header_Name>{props.character.name}</Header_Name>
        <Header_RaceClassLevel>
          {props.character.race +
            " " +
            props.character.class +
            " " +
            props.character.level}
        </Header_RaceClassLevel>
      </div>
    </Header_Main>
  );

  const renderSingleStat = (stat: Stat) => (
    <Header_Stat_Div key={stat.description}>
      <Header_Stat_Category>{stat.category}</Header_Stat_Category>
      <Header_Stat_Value>
        <Header_Stat_Value_Mod>{stat.mod} </Header_Stat_Value_Mod>
        <Header_Stat_Value_Number>{stat.value} </Header_Stat_Value_Number>
        <Header_Stat_Value_PostText>
          {stat.valuePostText}{" "}
        </Header_Stat_Value_PostText>
      </Header_Stat_Value>
      <Header_Stat_Description>{stat.description}</Header_Stat_Description>
    </Header_Stat_Div>
  );

  const renderHeaderStats = () => (
    <Header_Stats>
      {props.character.stats.map(stat => renderSingleStat(stat))}
    </Header_Stats>
  );

  const renderTracker = () => (
    <Header_Tracker>
      <Header_HealthTracker>
        <Header_HealthTracker_Label>HIT POINTS</Header_HealthTracker_Label>
        <Header_HealthTracker_Tracker>
          <StyledPlusMinus
            isPlus={false}
            backgroundColor={"darkred"}
            onClick={props.decreaseHealthBy10Handler}
          />
          <StyledPlusMinus isPlus={false} onClick={props.decreaseHealthHandler} />
          <Header_HealthTracker_Health>
            {props.remainingHealth}/{props.character.maximumHealth}
          </Header_HealthTracker_Health>
          <StyledPlusMinus isPlus={true} onClick={props.increaseHealthHandler} />
          <StyledPlusMinus isPlus={true}
            backgroundColor={"darkred"}
            onClick={props.increaseHealthBy10Handler}
          />
        </Header_HealthTracker_Tracker>
      </Header_HealthTracker>
      <Header_Inspiration_Tracker>INSPIRATION</Header_Inspiration_Tracker>
    </Header_Tracker>
  );

  return (
    <Header_Container>
      {renderHeaderMain()}
      {renderHeaderStats()}
      {renderTracker()}
    </Header_Container>
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

const Header_Container = styled.div`
  display: flex;
  -webkit-align-items: center;
  height: 130px;
  padding: 0 15px;
`;

const Header_Main = styled.div`
  display: flex;
  flex: 2;
`;

const Header_Stats = styled.div`
  display: flex;
  flex: 1;
`;

const Header_Tracker = styled.div`
  display: flex;
`;

const Header_Name = styled.div`
  font-size: 28px;
  color: #fff;
  font-family: "Roboto Condensed", Roboto, Helvetica, sans-serif;
  line-height: 1.1;
  text-align: left;
`;

const Header_RaceClassLevel = styled.div`
  font-size: 12px;
  color: #979aa4;
  text-align: left;
`;

const Header_Stat_Div = styled.div`
  margin-right: 20px;
`;

const Header_Stat_Category = styled.div`
  font-size: 7px;
  font-weight: bold;
  text-align: center;
  line-height: 1;
  height: 9px;
  color: #96bf6b;
  text-transform: uppercase;
  text-align: center;
`;

const Header_Stat_Value = styled.div`
  text-align: center;
`;

const Header_Stat_Value_Number = styled.span`
  font-size: 26px;
  text-align: center;
  color: #fff;
  width: auto;
`;

// TODO this one and the next one are identical. figure this out.
const Header_Stat_Value_Mod = styled.span`
  text-align: center;
  color: #979aa4;
  vertical-align: super;
  font-size: 9px;
  font-weight: normal;
`;

const Header_Stat_Value_PostText = styled.span`
  text-align: center;
  color: #979aa4;
  vertical-align: super;
  font-size: 9px;
  font-weight: normal;
`;

const Header_Stat_Description = styled.div`
  font-size: 10px;
  max-width: 65px;
  margin: 0 auto;
  text-align: center;
  color: #fff;
`;

const Header_HealthTracker = styled.div`
  position: relative;
  border: 1px solid #96bf6b;
  border-radius: 3px;
  text-align: center;
  font-family: Roboto, Helvetica, sans-serif;
  padding: 5px 20px 5px 20px;
`;

const Header_HealthTracker_Tracker = styled.div`
  display: flex;
  -webkit-align-items: center;
`;

const Header_HealthTracker_Label = styled.div`
  font-size: 10px;
  text-align: center;
  font-family: Roboto, Helvetica, sans-serif;
  color: #fff;
`;

const Header_HealthTracker_Health = styled.div`
  font-size: 24px;
  letter-spacing: -1px;
  line-height: 1;
  text-align: center;
  font-family: Roboto, Helvetica, sans-serif;
  color: #fff;
  padding: 0 10px 0 10px;
`;

const Header_Inspiration_Tracker = styled.div`
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