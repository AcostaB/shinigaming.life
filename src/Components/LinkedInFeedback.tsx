import React, { SFC } from "react";
import styled from 'styled-components/macro';
import { ILinkedInFeedback } from "../Models/LinkedInFeedback";

const LinkedInFeedback: SFC<ILinkedInFeedback> = props => {
  return (
    <LinkedInFeedbackContainer>
      <LeftSection>
        <Name>{props.name}</Name>
        <Position>{props.position}</Position>
        <Relationship>{props.relationship}</Relationship>{" "}
        <Location>{props.location}</Location>{" "}
        <DateString>{props.date}</DateString>{" "}
      </LeftSection>
      <Feedback>{props.feedback}</Feedback>
    </LinkedInFeedbackContainer>
  );
};

export default LinkedInFeedback;

const LinkedInFeedbackContainer = styled.div`
  text-align: left;
  color: white;
  font-size: 14px;
`;

const LeftSection = styled.div`
  display: inline-block;
  width: 20%;
`;

// TODO - colors need to be variables, pref part of theme
const Name = styled.div`
  align-items: center;
  color: white;
  background: #2196f3;
`;

const Position = styled.div`
  letter-spacing: 2px;
  line-height: 1.2;
`;

const Relationship = styled.div`
  letter-spacing: 2px;
  line-height: 1.2;
`;

const Location = styled.ul`
  font-size: 16px;
  letter-spacing: 1px;
  line-height: 1.5;
`;

const DateString = styled.ul`
  letter-spacing: 1px;
  line-height: 1.5;
`;

const Feedback = styled.ul`
  display: inline-block;
  letter-spacing: 1px;
  width: 60%;
`;
