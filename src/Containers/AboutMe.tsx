import React from "react";
import { map } from "lodash";

import WorkExperience from "../Components/WorkExperience/WorkExperience";

import {workExperiences} from "../Models/WorkExperience";

const AboutMe = () => (
  <div>
    {
      map(workExperiences, value => <WorkExperience {...value}/>)
    }
  </div>
);

export default AboutMe;
