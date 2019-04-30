import React from "react";
import PropTypes from "prop-types";
import { Checkbox } from "ui-toolkit";

ActionRow.propTypes = {
  children: PropTypes.node,
  onSelectAllClick: PropTypes.func,
  selectedItemCount: PropTypes.number,
  totalItems: PropTypes.number
};

ActionRow.defaultProps = {
  children: [],
  onSelectAllClick: () => {},
  selectedItemCount: 0,
  totalItems: 0
};

function ActionRow(props) {
  const { children, onSelectAllClick, selectedItemCount, totalItems } = props;

  const selectAllValue = selectedItemCount === totalItems;

  const handleSelectAllClick = () => onSelectAllClick(!selectAllValue);

  return (
    <div className="rmmGrid-actionRow primary-opacity-01-bg">
      <Checkbox
        checked={
          selectedItemCount > 0 && selectedItemCount === totalItems
            ? "checked"
            : ""
        }
        className="actionRow-selectAll"
        onClick={handleSelectAllClick}
        id="grid-select-all-checkbox"
      >
        <span className="actionRow-selectAll-label">Select All</span>
      </Checkbox>
      <div className="rmmGrid-actionRow-actions">{children}</div>
      <div className="rmmGrid-actionRow-selectedItemCount">
        {selectedItemCount +
          (selectedItemCount === 1 ? " Item Selected" : " Items Selected")}
      </div>
    </div>
  );
}

export default ActionRow;
