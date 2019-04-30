import React, { Component } from "react";
import PropTypes from "prop-types";
// import { DropdownButton, MenuItem, Checkbox } from "ui-toolkit";
import { uniq, mapValues } from "lodash";
// import ComboBox from "../ComboBox/ComboBox";
// import SortableHeader from "../SortableHeader/SortableHeader";
// TODO why can't I use an alias here?
// import DateRangePicker from "../DateRangePicker/DateRangePicker";
// import Pagination from "../Pagination/Pagination";
import "./Grid.css";
// import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";
// import ActionRow from "./ActionRow";

import {
  getSelectedIds,
  getCurrentPageData,
  concatClassNames
} from "../GridUtils";

class Grid extends Component {
  constructor(gridProps) {
    super(gridProps);

    this.grid = {
      GridWrapper: cProps => {
        console.log("RENDERING: grid wrapper");
        return (
          <div className="rmmGrid-wrapper" id={this.props.id}>
            {cProps.children}
          </div>
        )
      },
      // ActionRow: cProps => (
      //   <ActionRow
      //     {...cProps}
      //     onSelectAllClick={this.props.onSelectAllClick}
      //     selectedItemCount={this.props.selectedItemCount}
      //     totalItems={this.props.gridState.totalItems}
      //   >
      //     {cProps.children}
      //   </ActionRow>
      // ),
      GridHead: cProps => {
        console.log("RENDERING: grid head");

        return (
          <div className={`rmmGrid-gridHead ${cProps.className || ""}`}>
            {cProps.children}
          </div>
        )
      },
      HeaderRow: cProps => {
        console.log("RENDERING: header row");

        return (
          <div className={`rmmGrid-headerRow ${cProps.className || ""}`}>
            {cProps.children}
          </div>
        )
      },
      Header: cProps => {
        console.log("RENDERING: header");

        return (
          <div className={`header ${cProps.className || ""}`}>
            {/* {cProps.sortable ||
            cProps.sortable === undefined ||
            cProps.sortable === null ? (
              <SortableHeader
                {...cProps}
                onClick={() => this.handleSortChange(cProps.propertyName)}
                isActive={
                  this.props.gridState.searchCriteria.sort.sortBy ===
                  cProps.propertyName
                }
                sortOrder={this.props.gridState.searchCriteria.sort.sortOrder}
              >
                {cProps.children}
              </SortableHeader>
            ) : (
              <span>{cProps.displayText}</span>
            )} */}
            <span>{cProps.displayText}</span>
          </div>
        )
      },
      EmptyHeader: cProps => (
        <div className={`header ${cProps.className || ""}`} />
      ),
      FilterRow: cProps => (
        <div className={`rmmGrid-filterRow ${cProps.className || ""}`}>
          {cProps.children}
        </div>
      ),
      // ComboBox: cProps => (
      //   <div className={`filter ${cProps.className || ""}`}>
      //     <ComboBox
      //       {...cProps}
      //       className={cProps.className || ""}
      //       tabIndex="0"
      //       selectedItems={
      //         this.props.gridState.searchCriteria.filters[cProps.propertyName]
      //       }
      //       handleAddItems={itemsToAdd =>
      //         this.handleComboBoxAddItems(cProps.propertyName, itemsToAdd)
      //       }
      //       handleRemoveItems={itemsToRemove =>
      //         this.handleComboBoxRemoveItems(cProps.propertyName, itemsToRemove)
      //       }
      //     />
      //   </div>
      // ),
      // DateRangePicker: cProps => (
      //   <div className={`filter ${cProps.className || ""}`}>
      //     <DateRangePicker
      //       {...cProps}
      //       onChange={value =>
      //         this.handleFilterChange(cProps.propertyName, value)
      //       }
      //       startDate={
      //         this.props.gridState.searchCriteria.filters[cProps.propertyName]
      //           .startDate
      //       }
      //       endDate={
      //         this.props.gridState.searchCriteria.filters[cProps.propertyName]
      //           .endDate
      //       }
      //     />
      //   </div>
      // ),
      // Dropdown: cProps => {
      //   const filterValue = this.props.gridState.searchCriteria.filters[
      //     cProps.propertyName
      //   ];
      //   const options = keys(cProps.options).map(key => (
      //     <MenuItem
      //       className="filter-item"
      //       eventKey={key}
      //       key={key}
      //       onSelect={newValue =>
      //         this.handleFilterChange(cProps.propertyName, newValue)
      //       }
      //     >
      //       {cProps.template !== undefined && cProps.template !== null
      //         ? cProps.template(cProps.options[key])
      //         : cProps.options[key].display}
      //     </MenuItem>
      //   ));

      //   return (
      //     <div className={`filter ${cProps.className || ""}`}>
      //       <DropdownButton
      //         // {...cProps} TODO: need to address this.
      //         id={cProps.id}
      //         title={cProps.options[filterValue].display}
      //         bsStyle="default"
      //         tabIndex="0"
      //       >
      //         {options}
      //       </DropdownButton>
      //     </div>
      //   );
      // },
      GridBody: cProps => {
        console.log("RENDERING: grid body");

        return (
          <div className={`rmmGrid-gridBody ${cProps.className || ""}`}>
            {cProps.render(
              getCurrentPageData(this.props.gridState),
              getSelectedIds(this.props.gridState)
            )}
            {(this.props.forceGridOverlay || this.props.gridState.isBusy) && (
              <div className="overlay">
                {/* <LoadingOverlay /> */}
              </div>
            )}
          </div>
        )
      },
      DataRow: cProps => {
        console.log("RENDERING: data row");

        return (
          <div
            key={cProps.rowId}
            role="presentation"
            onClick={e => {
              if (!e.defaultPrevented) {
                this.handleSelectionChange(
                  cProps.rowId,
                  !cProps.currentlySelected
                );
              }
            }}
            className={concatClassNames([
              "rmmGrid-dataRow",
              cProps.currentlySelected ? "selected primary-opacity-01-bg " : "",
              cProps.className || ""
            ])}
          >
            {cProps.children}
          </div>
        )
      },
      DataCell: class extends React.PureComponent {

        render = () => {
          console.log("RENDERING: data cell");

          return (
            <div className={`dataCell ${this.props.className || ""}`}>
              {this.props.children}
            </div>
          );
        }
      },
      EmptyCell: cProps => (
        <div className={`dataCell ${cProps.className || ""}`} />
      ),
      // CheckBoxCell: cProps => (
      //   <div
      //     className={`grid-checkbox-cell dataCell ${cProps.className || ""}`}
      //   >
      //     <Checkbox
      //       checked={cProps.checked}
      //       onChange={() => {
      //         this.handleSelectionChange(cProps.propertyId, !cProps.checked);
      //       }}
      //     />
      //   </div>
      // ),
      GridFooter: cProps => (
        <div className={`rmmGrid-gridFoot ${cProps.className || ""}`}>
          {cProps.children}
        </div>
      ),
      // Pagination: cProps => (
      //   <div className={`rmmGrid-pagination ${cProps.className || ""}`}>
      //     <Pagination
      //       {...cProps}
      //       itemCount={this.props.gridState.currentPageIds.length}
      //       activePage={this.props.gridState.searchCriteria.pagination.page}
      //       totalItems={this.props.gridState.totalItems}
      //       onResultsPageChange={this.handlePageChange}
      //     />
      //   </div>
      // )
    };
  }

  handleSortChange = propertyName => {
    const {
      gridState,
      gridState: { searchCriteria }
    } = this.props;
    const currentSortBy = searchCriteria.sort.sortBy;
    const currentSortOrder = searchCriteria.sort.sortOrder;

    let newSortBy;
    let newSortOrder;

    if (currentSortBy === propertyName) {
      if (currentSortOrder === "asc") {
        newSortBy = propertyName;
        newSortOrder = "desc";
      } else if (currentSortOrder === "desc") {
        newSortBy = "";
        newSortOrder = "";
      } else {
        newSortBy = propertyName;
        newSortOrder = "asc";
      }
    } else {
      newSortBy = propertyName;
      newSortOrder = "asc";
    }

    const newGridState = {
      ...gridState,
      searchCriteria: {
        ...searchCriteria,
        sort: {
          sortBy: newSortBy,
          sortOrder: newSortOrder
        }
      }
    };

    this.props.handleGridChange(newGridState, true);
  };

  handleFilterChange = (propertyName, newFilterValue) => {
    const {
      gridState,
      gridState: { selectedStatusesById, searchCriteria }
    } = this.props;
    const currentFilter = searchCriteria.filters[propertyName];

    // Prevent query if filter didn't actually change.
    if (currentFilter === newFilterValue) {
      return;
    }

    const newGridState = {
      ...gridState,
      selectedStatusesById: {
        ...mapValues(selectedStatusesById, () => false)
      },
      searchCriteria: {
        ...searchCriteria,
        filters: {
          ...searchCriteria.filters,
          [propertyName]: newFilterValue
        }
      }
    };

    this.props.handleGridChange(newGridState, true);
  };

  handleComboBoxAddItems = (propertyName, itemsToAdd) => {
    const { filters } = this.props.gridState.searchCriteria;
    const newFilterValue = uniq([...filters[propertyName], ...itemsToAdd]);

    this.handleFilterChange(propertyName, newFilterValue);
  };

  handleComboBoxRemoveItems = (propertyName, itemsToRemove) => {
    const { filters } = this.props.gridState.searchCriteria;
    const newComboBoxItems = uniq(
      filters[propertyName].filter(item => !itemsToRemove.includes(item))
    );

    this.handleFilterChange(propertyName, newComboBoxItems);
  };

  handleSelectionChange = (id, newSelectionState) => {
    // this.props.selectionChange(id, newSelectionState);
  };

  handlePageChange = newPage => {
    const { gridState } = this.props;
    const newGridState = {
      ...gridState,
      searchCriteria: {
        ...gridState.searchCriteria,
        pagination: {
          ...gridState.searchCriteria.pagination,
          page: newPage
        }
      }
    };

    this.props.handleGridChange(newGridState, true);
  };

  render = () => this.props.children(this.grid);
}

Grid.propTypes = {
  children: PropTypes.func.isRequired,
  handleGridChange: PropTypes.func.isRequired,
  selectionChange: PropTypes.func.isRequired,
  selectedItemCount: PropTypes.number.isRequired,
  gridState: PropTypes.shape({
    currentPageIds: PropTypes.arrayOf(PropTypes.string),
    dataById: PropTypes.object.isRequired,
    searchCriteria: PropTypes.shape({
      sort: PropTypes.shape({
        sortBy: PropTypes.string,
        sortOrder: PropTypes.oneOf(["asc", "desc", ""])
      }).isRequired,
      filters: PropTypes.object,
      pagination: PropTypes.shape({
        page: PropTypes.number,
        itemsPerPage: PropTypes.number
      })
    }),
    isBusy: PropTypes.bool,
    selectedStatusesById: PropTypes.object.isRequired,
    totalItems: PropTypes.number
  }).isRequired,
  forceGridOverlay: PropTypes.bool,
  onSelectAllClick: PropTypes.func,
  id: PropTypes.string.isRequired // This is required for styling purposes. Need to define the column widths.
};

Grid.defaultProps = {
  forceGridOverlay: false,
  onSelectAllClick: () => { }
};

export default Grid;

// TODO: no need for getSelectedIds to be called for every single row. Store this in memory somewhere.
// TODO: improve on sort logic. ALSO, sort order should be an enum.
