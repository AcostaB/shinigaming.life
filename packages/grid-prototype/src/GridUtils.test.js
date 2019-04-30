import { cloneDeep } from "lodash";
import {
  getCurrentPageData,
  getSelectedIds,
  getSelectedItemCount,
  isItemSelected
} from "./GridUtils";

const gridState = {
  currentPageIds: ["P1", "P2", "P3"],
  dataById: {
    P1: {
      comments: [],
      policyId: "P1",
      status: "Not Signed Off"
    },
    P2: {
      comments: [],
      policyId: "P2",
      status: "Signed Off"
    },
    P3: {
      comments: [],
      policyId: "P3",
      status: "Not Signed Off"
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
    P1: true,
    P2: false,
    P3: false
  },
  totalItems: 3
};

// #region getCurrentPageData() tests

test("getCurrentPageData() returns an array of policy objects", () => {
  const expectation = [
    {
      comments: [],
      policyId: "P1",
      status: "Not Signed Off"
    },
    {
      comments: [],
      policyId: "P2",
      status: "Signed Off"
    },
    {
      comments: [],
      policyId: "P3",
      status: "Not Signed Off"
    }
  ];

  const result = getCurrentPageData(gridState);
  expect(result).toEqual(expectation);
});

// #endregion

// #region getSelectedIds() tests

test("getSelectedIds() returns an array of selected ids", () => {
  const expectation = ["P1", "P2"];
  const newGridState = cloneDeep(gridState);
  newGridState.selectedStatusesById = {
    P1: true,
    P2: true,
    P3: false
  };

  const result = getSelectedIds(newGridState);
  expect(result).toEqual(expectation);
});

// #endregion

// #region getSelectedItemCount() tests
test("getSelectedItemCount() returns the number of items selected.", () => {
  const expectation = 1;

  const result = getSelectedItemCount(1, {
    inclusiveSelection: true,
    ids: ["1"]
  });

  expect(result).toEqual(expectation);
});

// #endregion

test("check if item is selected with inclusive selection", () => {
  const selectionCriteria = {
    inclusiveSelection: true,
    ids: ["1"]
  };
  const result = isItemSelected("1", selectionCriteria);

  expect(result).toBe(true);
});

test("check if item is selected with exclusive selection", () => {
  const selectionCriteria = {
    inclusiveSelection: false,
    ids: []
  };
  const result = isItemSelected("1", selectionCriteria);

  expect(result).toBe(true);
});
