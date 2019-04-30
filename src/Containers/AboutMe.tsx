import React from "react";
import { map } from "lodash";

import WorkExperience from "../Components/WorkExperience";
import { workExperiences } from "../Models/WorkExperience";

import LinkedInFeedback from "../Components/LinkedInFeedback";
import { linkedInFeedback } from "../Models/LinkedInFeedback";

const AboutMe = () => (
  <div>
    {map(workExperiences, value => (
      <WorkExperience {...value} />
    ))}
    {map(linkedInFeedback, value => (
      <LinkedInFeedback {...value} />
    ))}
  </div>
);

export default AboutMe;
