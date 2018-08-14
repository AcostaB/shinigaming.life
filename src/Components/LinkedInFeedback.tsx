import React, { SFC } from "react";
import styled from "styled-components";
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
  font-family: "AntipastoPro-Hairline";
`;

const LeftSection = styled.div`
  display: inline-block;
`;

const Name = styled.div`
  align-items: center;
  font-size: 30px;
  color: #4bb9cd;
  background: linear-gradient(-90deg,  red,  green);
`;

const Position = styled.div`
  color: white;
  letter-spacing: 2px;
  font-size: 18px;
  margin-top: 5px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.2;
`;

const Relationship = styled.div`
  color: white;
  letter-spacing: 2px;
  font-size: 16px;
  margin-top: 5px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.2;
`;

const Location = styled.ul`
  display: inline-block;
  margin: 0 10px 0 10px;
  font-size: 16px;
  color: white;
  letter-spacing: 1px;
  margin-top: 10px;
  line-height: 1.5;
`;

const DateString = styled.ul`
  display: inline-block;
  margin: 0 10px 0 10px;
  font-size: 16px;
  color: white;
  letter-spacing: 1px;
  margin-top: 10px;
  line-height: 1.5;
`;

const Feedback = styled.ul`
  display: inline-block;
  margin: 0 10px 0 10px;
  font-size: 16px;
  color: white;
  letter-spacing: 1px;
  margin-top: 10px;
  line-height: 1.5;
`;
