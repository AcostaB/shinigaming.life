import React, { SFC } from "react";
import styled from 'styled-components/macro';
import { map } from "lodash";
import moment, { Moment } from "moment";
import { convertMonthToYearMonthDisplay } from "../Utils/Utils";
import { IWorkExperience } from "../Models/WorkExperience";

const WorkExperience: SFC<IWorkExperience> = (props) => {
  const start: Moment = moment(props.startDate);
  const end: Moment = props.endDate ? moment(props.endDate) : moment();
  let differenceInMonths: number = end.diff(start, "month");

  let duration: string = start.format("MMM YYYY");

  if (props.endDate != null) {
    duration += " - " + end.format("MMM YYYY") + ", " + convertMonthToYearMonthDisplay(differenceInMonths);
  } else {
    duration += " - Current, " + convertMonthToYearMonthDisplay(differenceInMonths);
  }

  return (
    <WorkExperienceContainer>
      <JobTitle>
        {props.jobTitle}
      </JobTitle>
      <Company>
        {props.companyName}
      </Company>
      <WorkDuration>
        {duration}
      </WorkDuration>
      <JobResponsibilities>
        {map(props.jobResponsibilities, value => <li>{value}</li>)}
      </JobResponsibilities>
    </WorkExperienceContainer>
  )
}

export default WorkExperience;

const WorkExperienceContainer = styled.div`
  text-align: left;
`;

// TODO this was copy pasted from the home page. Need to figure out how to share styled with styled components. 
const JobTitle = styled.div`
  align-items: center;
  font-size: 30px;
  color: #4bb9cd;
  background: linear-gradient(-90deg,  red,  green);
`;

// TODO this was copy pasted from the home page. Need to figure out how to share styled with styled components. 
const Company = styled.div`
  color: white;
  letter-spacing: 2px;
  font-size: 18px;
  margin-top: 5px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.2;
`;

// TODO this was copy pasted from the home page. Need to figure out how to share styled with styled components. 
const WorkDuration = styled.div`
  color: white;
  letter-spacing: 2px;
  font-size: 16px;
  margin-top: 5px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.2;
`;

// TODO this was copy pasted from the home page. Need to figure out how to share styled with styled components. 
const JobResponsibilities = styled.ul`
  display: inline-block;
  margin: 0 10px 0 10px;
  font-size: 16px;
  color: white;
  letter-spacing: 1px;
  margin-top: 10px;
  line-height: 1.5;
`;