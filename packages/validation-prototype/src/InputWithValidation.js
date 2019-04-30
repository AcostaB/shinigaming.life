import React, {
  Component
} from 'react';
import { Glyphicon } from "react-bootstrap";
import "./InputWithValidation.css";

export const InputWithValidation = (props) => {
  let validationErrorMessages;

  const runValidators = validators => {
    let errors = [];

    validators.forEach(validator => validator(props.value) ? errors.push(validator(props.value)) : '');

    if (errors.length > 0) {
      console.log("validations failed.");
    } else {
      console.log("validations succeded.");
    }

    return errors;
  }

  validationErrorMessages = runValidators(props.validators);

  return (
    <div className="inputWithValidation">
      <div className="errorRow">
        {
          validationErrorMessages.map(error => <div className="errorMessage">{error}</div>)
        }
      </div>
      <div className="inputRow">
        <div className="p-label">
          {props.label}
        </div>
        <input className="p-label" onChange={e => props.onChange(e.target.value)} />
        {validationErrorMessages.length > 0 && <Glyphicon glyph="remove" />}
      </div>
    </div>
  );
};