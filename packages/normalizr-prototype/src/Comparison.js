import React from "react";

const Comparison = ({ before, after, title }) => (
  <div>
    <pre className="title main">{title}</pre>
    <div>
      <code className="half">
        <div className="title">--- BEFORE --- </div>
        <div className="center">
          <pre className="json">
            {JSON.stringify(before, null, 4)}
          </pre>
        </div>
      </code>
      <code className="half">
        <div className="title">--- AFTER --- </div>
        <div className="center">
          <pre className="json">
            {JSON.stringify(after, null, 4)}
          </pre>
        </div>
      </code>
    </div>
  </div>
);

export default Comparison;