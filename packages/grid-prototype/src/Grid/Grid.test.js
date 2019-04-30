import React from "react";
import { shallow } from "enzyme";
import Grid from "./Grid";
import ComboBox from "./../ComboBox/ComboBox";

const defaultGridProps = {
  id: "grid1",
  selectedItemCount: 0,
  gridState: {
    currentPageIds: ["P1", "P2", "P3"],
    dataById: {
      P1: {
        comments: [],
        policyId: "P1",
        status: "Not Signed Off",
        carriedId: "carrier1"
      },
      P2: {
        comments: [],
        policyId: "P2",
        status: "Signed Off",
        carriedId: "carrier2"
      },
      P3: {
        comments: [],
        policyId: "P3",
        status: "Not Signed Off",
        carriedId: "carrier3"
      }
    },
    searchCriteria: {
      sort: {
        sortBy: "",
        sortOrder: ""
      },
      filters: {},
      pagination: {
        page: 1,
        itemsPerPage: 25
      }
    },
    isBusy: false,
    selectedStatusesById: {
      P1: false,
      P2: false,
      P3: false
    },
    totalItems: 2
  }
};

const gridSetup = (props = defaultGridProps, children = () => {}) => {
  const gridChangeHandler = jest.fn();
  const selectionChangeHandler = jest.fn();
  const gridProps = {
    ...props,
    handleGridChange: gridChangeHandler,
    selectionChange: selectionChangeHandler
  };
  const wrapper = shallow(<Grid {...gridProps}>{children}</Grid>);
  return { gridChangeHandler, selectionChangeHandler, gridProps, wrapper };
};

test("renders without crashing", () => {
  const { wrapper } = gridSetup(
    defaultGridProps,
    ({
      GridWrapper,
      GridHead,
      ActionRow,
      HeaderRow,
      Header,
      GridBody,
      Pagination,
      GridFooter
    }) => (
      <GridWrapper>
        <GridHead>
          <p>Header</p>
        </GridHead>
        <ActionRow>
          <button>Action</button>
        </ActionRow>
        <HeaderRow>
          <Header propertyName="carrierId">Carrier ID</Header>
        </HeaderRow>
        <GridBody render={() => {}} />
        <Pagination />
        <GridFooter className="foot">
          <div>Footer Content</div>
        </GridFooter>
      </GridWrapper>
    )
  );
  expect(wrapper).toMatchSnapshot();
});

test("renders no data without crashing", () => {
  const newProps = {
    ...defaultGridProps,
    gridState: {
      ...defaultGridProps.gridState,
      dataById: {}
    }
  };

  const { wrapper } = gridSetup(
    newProps,
    ({ GridWrapper, HeaderRow, Header, GridBody, Pagination }) => (
      <GridWrapper>
        <HeaderRow>
          <Header propertyName="carrierId">Carrier ID</Header>
        </HeaderRow>
        <GridBody render={() => {}} />
        <Pagination />
      </GridWrapper>
    )
  );
  expect(wrapper).toMatchSnapshot();
});

describe("Grid handleSortChange() behavior", () => {
  test("if there is no sort, handleSortChange('value') changes sortBy to 'value' and sortOrder to 'asc'", () => {
    const expectedGridState = {
      ...defaultGridProps.gridState,
      searchCriteria: {
        ...defaultGridProps.gridState.searchCriteria,
        sort: {
          ...defaultGridProps.gridState.searchCriteria.sort,
          sortBy: "value",
          sortOrder: "asc"
        }
      }
    };

    const { gridChangeHandler, wrapper } = gridSetup();
    wrapper.instance().handleSortChange("value");
    expect(gridChangeHandler).toHaveBeenCalledTimes(1);
    expect(gridChangeHandler).toHaveBeenCalledWith(expectedGridState, true);
  });

  test("if sortBy is 'value' and sortOrder is 'asc', then handleSortChange('value') changes sortOrder to 'desc' and does not change sortBy", () => {
    const expectedGridState = {
      ...defaultGridProps.gridState,
      searchCriteria: {
        ...defaultGridProps.gridState.searchCriteria,
        sort: {
          ...defaultGridProps.gridState.searchCriteria.sort,
          sortBy: "value",
          sortOrder: "desc"
        }
      }
    };

    const newProps = {
      ...defaultGridProps,
      gridState: {
        ...defaultGridProps.gridState,
        searchCriteria: {
          ...defaultGridProps.gridState.searchCriteria,
          sort: {
            ...defaultGridProps.gridState.searchCriteria.sort,
            sortBy: "value",
            sortOrder: "asc"
          }
        }
      }
    };

    const { gridChangeHandler, wrapper } = gridSetup(newProps);
    wrapper.instance().handleSortChange("value");
    expect(gridChangeHandler).toHaveBeenCalledTimes(1);
    expect(gridChangeHandler).toHaveBeenCalledWith(expectedGridState, true);
  });

  test("if sortBy is 'value' and sortOrder is 'desc', handleSortChange('value') removes sortBy and sortOrder", () => {
    const expectedGridState = {
      ...defaultGridProps.gridState,
      searchCriteria: {
        ...defaultGridProps.gridState.searchCriteria,
        sort: {
          ...defaultGridProps.gridState.searchCriteria.sort,
          sortBy: "",
          sortOrder: ""
        }
      }
    };

    const newProps = {
      ...defaultGridProps,
      gridState: {
        ...defaultGridProps.gridState,
        searchCriteria: {
          ...defaultGridProps.gridState.searchCriteria,
          sort: {
            ...defaultGridProps.gridState.searchCriteria.sort,
            sortBy: "value",
            sortOrder: "desc"
          }
        }
      }
    };

    const { gridChangeHandler, wrapper } = gridSetup(newProps);
    wrapper.instance().handleSortChange("value");
    expect(gridChangeHandler).toHaveBeenCalledTimes(1);
    expect(gridChangeHandler).toHaveBeenCalledWith(expectedGridState, true);
  });

  test("if sortBy is 'value' and sortOrder is '', handleSortChange('value') sets sortBy to 'value' and sortOrder to 'asc'", () => {
    const expectedGridState = {
      ...defaultGridProps.gridState,
      searchCriteria: {
        ...defaultGridProps.gridState.searchCriteria,
        sort: {
          ...defaultGridProps.gridState.searchCriteria.sort,
          sortBy: "value",
          sortOrder: "asc"
        }
      }
    };

    const newProps = {
      ...defaultGridProps,
      gridState: {
        ...defaultGridProps.gridState,
        searchCriteria: {
          ...defaultGridProps.gridState.searchCriteria,
          sort: {
            ...defaultGridProps.gridState.searchCriteria.sort,
            sortBy: "value",
            sortOrder: ""
          }
        }
      }
    };

    const { gridChangeHandler, wrapper } = gridSetup(newProps);
    wrapper.instance().handleSortChange("value");
    expect(gridChangeHandler).toHaveBeenCalledTimes(1);
    expect(gridChangeHandler).toHaveBeenCalledWith(expectedGridState, true);
  });

  test("if sortBy is 'value', handleSortChange('otherValue') changes sortBy to 'otherValue' and sortOrder to 'asc'", () => {
    const expectedGridState = {
      ...defaultGridProps.gridState,
      searchCriteria: {
        ...defaultGridProps.gridState.searchCriteria,
        sort: {
          ...defaultGridProps.gridState.searchCriteria.sort,
          sortBy: "otherValue",
          sortOrder: "asc"
        }
      }
    };

    const newProps = {
      ...defaultGridProps,
      gridState: {
        ...defaultGridProps.gridState,
        searchCriteria: {
          ...defaultGridProps.gridState.searchCriteria,
          sort: {
            ...defaultGridProps.gridState.searchCriteria.sort,
            sortBy: "value",
            sortOrder: "desc"
          }
        }
      }
    };

    const { gridChangeHandler, wrapper } = gridSetup(newProps);
    wrapper.instance().handleSortChange("otherValue");
    expect(gridChangeHandler).toHaveBeenCalledTimes(1);
    expect(gridChangeHandler).toHaveBeenCalledWith(expectedGridState, true);
  });
});

describe("Grid handleFilterChange() behavior", () => {
  test("handleFilterChange() adds a new filter property to the filters object", () => {
    const expectedGridState = {
      ...defaultGridProps.gridState,
      searchCriteria: {
        ...defaultGridProps.gridState.searchCriteria,
        filters: {
          ...defaultGridProps.gridState.searchCriteria.filters,
          propertyName: ["newFilterValue"]
        }
      }
    };

    const { gridChangeHandler, wrapper } = gridSetup();
    wrapper.instance().handleFilterChange("propertyName", ["newFilterValue"]);
    expect(gridChangeHandler).toHaveBeenCalledTimes(1);
    expect(gridChangeHandler).toHaveBeenCalledWith(expectedGridState, true);
  });

  test("if the new filter property already exists in the filters object, handleFilterChange() maintains the filter property, but replaces the filter value", () => {
    const expectedGridState = {
      ...defaultGridProps.gridState,
      searchCriteria: {
        ...defaultGridProps.gridState.searchCriteria,
        filters: {
          ...defaultGridProps.gridState.searchCriteria.filters,
          oldFilterValue: "value",
          propertyName: ["newFilterValue"]
        }
      }
    };

    const newProps = {
      ...defaultGridProps,
      gridState: {
        ...defaultGridProps.gridState,
        searchCriteria: {
          ...defaultGridProps.gridState.searchCriteria,
          filters: {
            ...defaultGridProps.gridState.searchCriteria.filters,
            oldFilterValue: "value"
          }
        }
      }
    };

    const { gridChangeHandler, wrapper } = gridSetup(newProps);
    wrapper.instance().handleFilterChange("propertyName", ["newFilterValue"]);
    expect(gridChangeHandler).toHaveBeenCalledTimes(1);
    expect(gridChangeHandler).toHaveBeenCalledWith(expectedGridState, true);
  });

  test("if the new filter property did not change, handleFilterChange does not update the grid state", () => {
    const filterValue = ["filterValue"];
    const filters = {
      propertyName: filterValue
    };

    const newProps = {
      ...defaultGridProps,
      gridState: {
        ...defaultGridProps.gridState,
        searchCriteria: {
          ...defaultGridProps.gridState.searchCriteria,
          filters
        }
      }
    };

    const { gridChangeHandler, wrapper } = gridSetup(newProps);
    wrapper.instance().handleFilterChange("propertyName", filterValue);
    expect(gridChangeHandler).toHaveBeenCalledTimes(0);
  });
});

describe("Grid handleComboBoxAddItems() behavior", () => {
  test("handleComboBoxAddItems() is set on the combobox to eventually invoke grid change with updated grid state", () => {
    const expectedGridState = {
      ...defaultGridProps.gridState,
      searchCriteria: {
        ...defaultGridProps.gridState.searchCriteria,
        filters: {
          ...defaultGridProps.gridState.searchCriteria.filters,
          policyId: ["P1", "P2"]
        }
      }
    };

    const newProps = {
      ...defaultGridProps,
      gridState: {
        ...defaultGridProps.gridState,
        searchCriteria: {
          ...defaultGridProps.gridState.searchCriteria,
          filters: {
            ...defaultGridProps.gridState.searchCriteria.filters,
            policyId: []
          }
        }
      }
    };

    const { gridChangeHandler, wrapper } = gridSetup(newProps);

    const cbWrapper = shallow(
      wrapper.instance().grid.ComboBox({
        placeholder: "Enter Policy ID(s)",
        propertyName: "policyId"
      })
    );

    cbWrapper
      .find(ComboBox)
      .props()
      .handleAddItems(["P1", "P2"]);

    expect(gridChangeHandler).toHaveBeenCalledTimes(1);
    expect(gridChangeHandler).toHaveBeenCalledWith(expectedGridState, true);
  });

  test("handleComboBoxRemoveItems() is set on the combobox to eventually invoke grid change with updated grid state", () => {
    const expectedGridState = {
      ...defaultGridProps.gridState,
      searchCriteria: {
        ...defaultGridProps.gridState.searchCriteria,
        filters: {
          ...defaultGridProps.gridState.searchCriteria.filters,
          policyId: ["P2"]
        }
      }
    };

    const newProps = {
      ...defaultGridProps,
      gridState: {
        ...defaultGridProps.gridState,
        searchCriteria: {
          ...defaultGridProps.gridState.searchCriteria,
          filters: {
            ...defaultGridProps.gridState.searchCriteria.filters,
            policyId: ["P1", "P2"]
          }
        }
      }
    };

    const { gridChangeHandler, wrapper } = gridSetup(newProps);

    const cbWrapper = shallow(
      wrapper.instance().grid.ComboBox({
        placeholder: "Enter Policy ID(s)",
        propertyName: "policyId"
      })
    );

    cbWrapper
      .find(ComboBox)
      .props()
      .handleRemoveItems(["P1"]);

    expect(gridChangeHandler).toHaveBeenCalledTimes(1);
    expect(gridChangeHandler).toHaveBeenCalledWith(expectedGridState, true);
  });

  test("combobox selectedItems should be set to incoming filter state", () => {
    const newProps = {
      ...defaultGridProps,
      gridState: {
        ...defaultGridProps.gridState,
        searchCriteria: {
          ...defaultGridProps.gridState.searchCriteria,
          filters: {
            ...defaultGridProps.gridState.searchCriteria.filters,
            policyId: ["P1", "P2"]
          }
        }
      }
    };

    const { wrapper } = gridSetup(newProps);

    const cbWrapper = shallow(
      wrapper.instance().grid.ComboBox({
        placeholder: "Enter Policy ID(s)",
        propertyName: "policyId"
      })
    );

    const { selectedItems } = cbWrapper.find(ComboBox).props();

    expect(selectedItems).toBe(
      newProps.gridState.searchCriteria.filters.policyId
    );
  });

  test("handleComboBoxAddItems() adds an array of filter values to a filter property in the filters object", () => {
    const expectedGridState = {
      ...defaultGridProps.gridState,
      searchCriteria: {
        ...defaultGridProps.gridState.searchCriteria,
        filters: {
          propertyName: ["oldFilterValue", "F1", "F2", "F3"]
        }
      }
    };

    const newProps = {
      ...defaultGridProps,
      gridState: {
        ...defaultGridProps.gridState,
        searchCriteria: {
          ...defaultGridProps.gridState.searchCriteria,
          filters: {
            propertyName: ["oldFilterValue"]
          }
        }
      }
    };

    const { gridChangeHandler, wrapper } = gridSetup(newProps);

    wrapper
      .instance()
      .handleComboBoxAddItems("propertyName", ["F1", "F2", "F3"]);

    expect(gridChangeHandler).toHaveBeenCalledTimes(1);
    expect(gridChangeHandler).toBeCalledWith(expectedGridState, true);
  });

  test("handleComboBoxAddItems() prevents the addition of duplicate filter values for a singe filter property", () => {
    const expectedGridState = {
      ...defaultGridProps.gridState,
      searchCriteria: {
        ...defaultGridProps.gridState.searchCriteria,
        filters: {
          propertyName: ["oldFilterValue", "F1", "F2", "F3", "F4"]
        }
      }
    };

    const newProps = {
      ...defaultGridProps,
      gridState: {
        ...defaultGridProps.gridState,
        searchCriteria: {
          ...defaultGridProps.gridState.searchCriteria,
          filters: {
            propertyName: ["oldFilterValue", "F1", "F2", "F3"]
          }
        }
      }
    };

    const { gridChangeHandler, wrapper } = gridSetup(newProps);

    wrapper
      .instance()
      .handleComboBoxAddItems("propertyName", ["F2", "F3", "F4"]);

    expect(gridChangeHandler).toHaveBeenCalledTimes(1);
    expect(gridChangeHandler).toBeCalledWith(expectedGridState, true);
  });
});

describe("Grid handleComboBoxRemoveItems() behavior", () => {
  test("handleComboBoxRemoveItems() removes an array of filter values from a filter property in the filters object", () => {
    const expectedGridState = {
      ...defaultGridProps.gridState,
      searchCriteria: {
        ...defaultGridProps.gridState.searchCriteria,
        filters: {
          propertyName: ["oldFilterValue", "F1"]
        }
      }
    };

    const newProps = {
      ...defaultGridProps,
      gridState: {
        ...defaultGridProps.gridState,
        searchCriteria: {
          ...defaultGridProps.gridState.searchCriteria,
          filters: {
            propertyName: ["oldFilterValue", "F1", "F2", "F3"]
          }
        }
      }
    };

    const { gridChangeHandler, wrapper } = gridSetup(newProps);
    wrapper.instance().handleComboBoxRemoveItems("propertyName", ["F2", "F3"]);
    expect(gridChangeHandler).toHaveBeenCalledTimes(1);
    expect(gridChangeHandler).toHaveBeenCalledWith(expectedGridState, true);
  });
});

describe("Grid handleSelectionChange() behavior", () => {
  test("handleSelectionChange() adds an id property with a value of true to the selectedStatusById object", () => {
    const { selectionChangeHandler, wrapper } = gridSetup();
    wrapper.instance().handleSelectionChange("P4", true);
    expect(selectionChangeHandler).toHaveBeenCalledTimes(1);
    expect(selectionChangeHandler).toHaveBeenCalledWith("P4", true);
  });

  test("handleSelectionChange() changes the selection value for a policy from false to true", () => {
    const { selectionChangeHandler, wrapper } = gridSetup();
    wrapper.instance().handleSelectionChange("P3", false);
    expect(selectionChangeHandler).toHaveBeenCalledTimes(1);
    expect(selectionChangeHandler).toHaveBeenCalledWith("P3", false);
  });
});

describe("Grid handlePageChange() behavior", () => {
  test("handlePageChange() changes the page number to the provided value", () => {
    const expectedGridState = {
      ...defaultGridProps.gridState,
      searchCriteria: {
        ...defaultGridProps.gridState.searchCriteria,
        pagination: {
          ...defaultGridProps.gridState.searchCriteria.pagination,
          page: 5
        }
      }
    };

    const { gridChangeHandler, wrapper } = gridSetup();
    wrapper.instance().handlePageChange(5);
    expect(gridChangeHandler).toHaveBeenCalledTimes(1);
    expect(gridChangeHandler).toHaveBeenCalledWith(expectedGridState, true);
  });
});

describe("Grid inner components", () => {
  const innerComponentProps = {
    ...defaultGridProps,
    selectedItemCount: 1,
    gridState: {
      ...defaultGridProps.gridState,
      isBusy: true,
      searchCriteria: {
        ...defaultGridProps.gridState.searchCriteria,
        filters: {
          datePropertyName: {
            startDate: new Date(2018, 4, 18, 0, 0, 0, 0),
            endDate: new Date(2018, 4, 22, 0, 0, 0, 0)
          },
          textPropertyName: "1"
        }
      },
      selectedStatusesById: {
        ...defaultGridProps.gridState.selectedStatusesById,
        selectedRowId: true
      }
    },
    forceGridOverlay: true
  };

  const innerComponentGridSetup = () => gridSetup(innerComponentProps);

  test("GridWrapper renders correctly", () => {
    const { wrapper } = innerComponentGridSetup();
    const gridWrapper = wrapper.instance().grid.GridWrapper({
      className: "grid-wrapper-class",
      children: <p>Hello</p>
    });
    expect(gridWrapper).toMatchSnapshot();
  });

  test("ActionRow renders correctly", () => {
    const { wrapper } = innerComponentGridSetup();
    const actionRow = wrapper.instance().grid.ActionRow({
      onSelectAllClick: jest.fn(),
      children: <p>Hello</p>
    });
    expect(actionRow).toMatchSnapshot();
  });

  test("GridHead renders correctly", () => {
    const { wrapper } = innerComponentGridSetup();
    const gridHead = wrapper.instance().grid.GridHead({
      className: "grid-head-class",
      children: <p>Hello</p>
    });
    expect(gridHead).toMatchSnapshot();
  });

  test("HeaderRow renders correctly", () => {
    const { wrapper } = innerComponentGridSetup();
    const headerRow = wrapper.instance().grid.HeaderRow({
      className: "grid-header-row-class",
      children: <p>Hello</p>
    });
    expect(headerRow).toMatchSnapshot();
  });

  test("Sortable Header renders correctly", () => {
    const { wrapper } = innerComponentGridSetup();
    const sortableHeader = wrapper.instance().grid.Header({
      className: "grid-header-class",
      propertyName: "prop-name",
      sortable: true,
      children: <p>Hello</p>
    });
    expect(sortableHeader).toMatchSnapshot();
  });

  test("Sortable Header onClick changes grid state", () => {
    const { gridChangeHandler, gridProps, wrapper } = innerComponentGridSetup();
    const sortableHeader = wrapper.instance().grid.Header({
      className: "grid-header-class",
      propertyName: "prop-name",
      sortable: true,
      children: <p>Hello</p>
    });

    shallow(sortableHeader)
      .childAt(0)
      .props()
      .onClick();

    const expectedState = {
      ...gridProps.gridState,
      searchCriteria: {
        ...gridProps.gridState.searchCriteria,
        sort: { sortBy: "prop-name", sortOrder: "asc" }
      }
    };

    expect(gridChangeHandler).toHaveBeenCalledTimes(1);
    expect(gridChangeHandler).toHaveBeenCalledWith(expectedState, true);
  });

  test("Non-Sortable Header renders correctly", () => {
    const { wrapper } = innerComponentGridSetup();
    const textHeader = wrapper.instance().grid.Header({
      className: "grid-header-class",
      displayText: "display-text",
      sortable: false
    });
    expect(textHeader).toMatchSnapshot();
  });

  test("EmptyHeader renders correctly", () => {
    const { wrapper } = innerComponentGridSetup();
    const emptyHeader = wrapper.instance().grid.EmptyHeader({
      className: "grid-empty-header-class"
    });
    expect(emptyHeader).toMatchSnapshot();
  });

  test("FilterRow renders correctly", () => {
    const { wrapper } = innerComponentGridSetup();
    const filterRow = wrapper.instance().grid.FilterRow({
      className: "grid-filter-row-class",
      children: <p>Hello</p>
    });
    expect(filterRow).toMatchSnapshot();
  });

  test("ComboBox renders correctly", () => {
    const { wrapper } = innerComponentGridSetup();
    const comboBox = wrapper.instance().grid.ComboBox({
      className: "grid-combo-box-class",
      propertyName: "propertyName",
      placeholder: "placeholder text",
      children: <p>Hello</p>
    });
    expect(comboBox).toMatchSnapshot();
  });

  test("DateRangePicker onChange changes grid state", () => {
    const { gridChangeHandler, gridProps, wrapper } = innerComponentGridSetup();
    const dateRangePicker = wrapper.instance().grid.DateRangePicker({
      className: "grid-date-range-class",
      propertyName: "datePropertyName"
    });

    const dateRange = {
      startDate: null,
      endDate: null
    };

    shallow(dateRangePicker)
      .childAt(0)
      .props()
      .onChange(dateRange);

    const expectedState = {
      ...gridProps.gridState,
      searchCriteria: {
        ...gridProps.gridState.searchCriteria,
        filters: {
          ...gridProps.gridState.searchCriteria.filters,
          datePropertyName: dateRange
        }
      },
      selectedStatusesById: {
        ...gridProps.gridState.selectedStatusesById,
        selectedRowId: false
      }
    };

    expect(gridChangeHandler).toHaveBeenCalledTimes(1);
    expect(gridChangeHandler).toHaveBeenCalledWith(expectedState, true);
  });

  test("Dropdown renders correctly", () => {
    const { wrapper } = innerComponentGridSetup();
    const dropDown = wrapper.instance().grid.Dropdown({
      className: "grid-date-range-class",
      propertyName: "textPropertyName",
      options: {
        "1": { display: "Value 1" },
        "2": { display: "Value 2" },
        "3": { display: "Value 3" }
      }
    });
    expect(dropDown).toMatchSnapshot();
  });

  test("Dropdown menu calls template function if defined", () => {
    const { wrapper } = innerComponentGridSetup();
    const templateFunction = jest.fn();

    wrapper.instance().grid.Dropdown({
      className: "grid-date-range-class",
      propertyName: "textPropertyName",
      template: templateFunction,
      options: {
        "1": { display: "Value 1" },
        "2": { display: "Value 2" },
        "3": { display: "Value 3" }
      }
    });
    expect(templateFunction).toHaveBeenCalledTimes(3);
    expect(templateFunction).toHaveBeenCalledWith({ display: "Value 1" });
    expect(templateFunction).toHaveBeenCalledWith({ display: "Value 2" });
    expect(templateFunction).toHaveBeenCalledWith({ display: "Value 3" });
  });

  test("Dropdown menu item onSelect changes grid state", () => {
    const { gridChangeHandler, gridProps, wrapper } = innerComponentGridSetup();
    const dropDown = wrapper.instance().grid.Dropdown({
      className: "grid-date-range-class",
      propertyName: "textPropertyName",
      options: {
        "1": { display: "Value 1" },
        "2": { display: "Value 2" },
        "3": { display: "Value 3" }
      }
    });

    shallow(dropDown)
      .childAt(0)
      .childAt(1)
      .props()
      .onSelect("2");

    const expectedState = {
      ...gridProps.gridState,
      searchCriteria: {
        ...gridProps.gridState.searchCriteria,
        filters: {
          ...gridProps.gridState.searchCriteria.filters,
          textPropertyName: "2"
        }
      },
      selectedStatusesById: {
        ...gridProps.gridState.selectedStatusesById,
        selectedRowId: false
      }
    };

    expect(gridChangeHandler).toHaveBeenCalledTimes(1);
    expect(gridChangeHandler).toHaveBeenCalledWith(expectedState, true);
  });

  test("GridBody renders correctly", () => {
    const { wrapper } = innerComponentGridSetup();
    const gridBody = wrapper.instance().grid.GridBody({
      className: "grid-body-class",
      propertyName: "propertyName",
      render: jest.fn()
    });
    expect(gridBody).toMatchSnapshot();
  });

  test("DataRow renders correctly", () => {
    const { wrapper } = innerComponentGridSetup();
    const dataRow = wrapper.instance().grid.DataRow({
      rowId: "1",
      className: "grid-data-row-class",
      children: <p>Hello</p>
    });
    expect(dataRow).toMatchSnapshot();
  });

  test("DataRow renders 'selected' class if item selected", () => {
    const { wrapper } = innerComponentGridSetup();
    const dataRow = wrapper.instance().grid.DataRow({
      rowId: "selectedRowId",
      className: "grid-data-row-class",
      children: <p>Hello</p>,
      currentlySelected: true
    });

    const dataRowWrapper = shallow(dataRow);

    expect(dataRowWrapper.props().className).toMatch(/selected/);
  });

  test("DataRow onClick changes grid state if event is propogated", () => {
    const { selectionChangeHandler, wrapper } = innerComponentGridSetup();
    const dataRow = wrapper.instance().grid.DataRow({
      rowId: "1",
      className: "grid-data-row-class",
      children: <p>Hello</p>,
      currentlySelected: false
    });

    shallow(dataRow)
      .props()
      .onClick({ defaultPrevented: false });

    expect(selectionChangeHandler).toHaveBeenCalledTimes(1);
    expect(selectionChangeHandler).toHaveBeenCalledWith("1", true);
  });

  test("DataRow onClick does not changes grid state if event is not propogated", () => {
    const { selectionChangeHandler, wrapper } = innerComponentGridSetup();
    const dataRow = wrapper.instance().grid.DataRow({
      rowId: "1",
      className: "grid-data-row-class",
      children: <p>Hello</p>
    });

    shallow(dataRow)
      .props()
      .onClick({ defaultPrevented: true });

    expect(selectionChangeHandler).toHaveBeenCalledTimes(0);
  });
  test("DataCell renders correctly", () => {
    const { wrapper } = innerComponentGridSetup();
    const dataCell = wrapper.instance().grid.DataCell({
      className: "grid-data-cell-class",
      children: <p>Hello</p>
    });
    expect(dataCell).toMatchSnapshot();
  });

  test("EmptyCell renders correctly", () => {
    const { wrapper } = innerComponentGridSetup();
    const emptyCell = wrapper.instance().grid.EmptyCell({
      className: "grid-empty-cell-class"
    });
    expect(emptyCell).toMatchSnapshot();
  });

  test("CheckBoxCell renders correctly", () => {
    const { wrapper } = innerComponentGridSetup();
    const checkboxCell = wrapper.instance().grid.CheckBoxCell({
      className: "grid-checkbox-cell-class",
      checked: "checked",
      propertyId: "propertyId"
    });
    expect(checkboxCell).toMatchSnapshot();
  });

  test("CheckBoxCell Checkbox onChange changes grid state", () => {
    const { selectionChangeHandler, wrapper } = innerComponentGridSetup();
    const checkboxCell = wrapper.instance().grid.CheckBoxCell({
      className: "grid-checkbox-cell-class",
      checked: "checked",
      propertyId: "propertyId"
    });

    shallow(checkboxCell)
      .childAt(0)
      .props()
      .onChange("propertyId");

    expect(selectionChangeHandler).toHaveBeenCalledTimes(1);
    expect(selectionChangeHandler).toHaveBeenCalledWith("propertyId", false);
  });

  test("GridFooter renders correctly", () => {
    const { wrapper } = innerComponentGridSetup();
    const gridFooter = wrapper.instance().grid.GridFooter({
      className: "grid-footer-class",
      children: <p>Hello</p>
    });
    expect(gridFooter).toMatchSnapshot();
  });

  test("Pagination renders correctly", () => {
    const { wrapper } = innerComponentGridSetup();
    const pagination = wrapper.instance().grid.Pagination({
      className: "grid-pagination-class"
    });
    expect(pagination).toMatchSnapshot();
  });
});
